'use client';

import React, { useEffect, useRef, HTMLAttributes } from 'react';

export interface IAutoFitTextareaProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  maxFontSize?: number;
  minFontSize?: number;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  name?: string;
}

const AppAutofitTextarea = React.forwardRef<
  HTMLDivElement,
  IAutoFitTextareaProps
>(
  (
    {
      maxFontSize = 32,
      minFontSize = 14,
      value,
      onChange,
      onBlur,
      className,
      placeholder,
      maxLength,
      name,
      contentEditable = true,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const isFocused = useRef(false);
    const isComposing = useRef(false);

    const setRefs = (node: HTMLDivElement) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const adjustFontSize = (el: HTMLDivElement) => {
      el.style.fontSize = `${maxFontSize}px`;
      let size = maxFontSize;
      while (el.scrollHeight > el.clientHeight && size > minFontSize) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    // Sync initial content and whenever value changes externally (not while user is typing)
    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;

      const normalized = value ?? '';
      // Skip DOM mutation while focused to avoid resetting cursor position
      if (!isFocused.current && el.innerText !== normalized) {
        el.innerText = normalized;
      }

      adjustFontSize(el);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, maxFontSize, minFontSize]);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      if (isComposing.current) return;

      const el = e.currentTarget;
      let text = el.innerText;

      if (maxLength !== undefined && text.length > maxLength) {
        text = text.slice(0, maxLength);
        el.innerText = text;
        // Restore cursor to end after content truncation
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }

      onChange?.(text);
      adjustFontSize(el);
    };

    return (
      <div
        ref={setRefs}
        contentEditable={contentEditable}
        suppressContentEditableWarning
        role="textbox"
        aria-multiline
        data-name={name}
        data-placeholder={placeholder}
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
          onBlur?.();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // Insert a flat <br> instead of letting the browser wrap new lines in
            // nested <div>/<p> elements, which break the uniform font-size on the parent.
            const sel = window.getSelection();
            if (!sel?.rangeCount) return;
            const range = sel.getRangeAt(0);
            range.deleteContents();
            const br = document.createElement('br');
            range.insertNode(br);
            // A <br> at the very end of a contenteditable is invisible until there
            // is a following node — add a sentinel <br> to make the new line render.
            if (!br.nextSibling) {
              br.parentNode?.appendChild(document.createElement('br'));
            }
            range.setStartAfter(br);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          const sel = window.getSelection();
          if (!sel?.rangeCount) return;
          const range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          // Trigger input handler manually since we bypassed the native paste
          handleInput({
            currentTarget: e.currentTarget,
          } as React.FormEvent<HTMLDivElement>);
        }}
        onInput={handleInput}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false;
          handleInput(e as unknown as React.FormEvent<HTMLDivElement>);
        }}
        className={[
          'overflow-y-auto outline-none',
          'before:pointer-events-none',
          'empty:before:content-[attr(data-placeholder)]',
          className ?? '',
        ].join(' ')}
        {...props}
      />
    );
  }
);

AppAutofitTextarea.displayName = 'AutoFitTextarea';

export default AppAutofitTextarea;
