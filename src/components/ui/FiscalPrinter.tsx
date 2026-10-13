'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const receiptSeedLines: [string, string][] = [
  ['EASYFUEL PRO', 'receipt-heading'],
  ['PERGAMON SERVICE STATION', 'receipt-center'],
  ['--------------------------', 'receipt-rule'],
];

type ReceiptItem = {
  pump: number;
  fuel: 'DIESEL' | 'SUPER';
  liters: number;
  unitPrice: number;
};

const formatKes = (amount: number) => `KES ${amount.toFixed(2)}`;

function createReceiptLines(printRun: number): [string, string][] {
  const itemCount = 3;
  const items: ReceiptItem[] = Array.from({ length: itemCount }, (_, index) => ({
    pump: ((printRun + index) % 3) + 1,
    fuel: index % 2 === 0 ? 'DIESEL' : 'SUPER',
    liters: Number((8 + ((printRun * 3 + index * 7) % 50) / 10).toFixed(2)),
    unitPrice: 180 + ((printRun + index) % 5),
  }));
  const grossTotal = items.reduce((sum, item) => sum + item.liters * item.unitPrice, 0);
  const vat = grossTotal * 16 / 116;
  const netTotal = grossTotal - vat;
  const totalLiters = items.reduce((sum, item) => sum + item.liters, 0);
  const lines: [string, string][] = [...receiptSeedLines];

  items.forEach((item) => {
    const amount = item.liters * item.unitPrice;
    lines.push([`P0${item.pump} ${item.fuel.padEnd(6)} ${item.liters.toFixed(2)}L ${formatKes(amount)}`, 'receipt-item']);
  });

  lines.push(
    ['--------------------------', 'receipt-rule'],
    [`ITEMS ${items.length}   VOL ${totalLiters.toFixed(2)}L`, 'receipt-total-items'],
    [`SUBTOTAL   ${formatKes(netTotal)}`, 'receipt-subtotal'],
    [`VAT 16%    ${formatKes(vat)}`, 'receipt-subtotal'],
    [`TOTAL      ${formatKes(grossTotal)}`, 'receipt-total'],
    ['--------------------------', 'receipt-rule'],
    ['eTIMS      VALIDATED', 'receipt-valid'],
    [`INVOICE    00${4891 + printRun}`, ''],
    ['PAYMENT    CARD', ''],
    ['TRANSACTION SIGNED', 'receipt-valid'],
    ['THANK YOU FOR FUELING SMART', 'receipt-center'],
    ['easyfuelpro.com', 'receipt-center'],
    ['By Pergamon Group Ltd.', 'receipt-center'],
  );

  return lines;
}

export function FiscalPrinter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printRun, setPrintRun] = useState(0);
  const [printedLines, setPrintedLines] = useState<[string, string][]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const dismiss = () => {
    setIsOpen(false);
    setIsPrinting(false);
    setPrintedLines([]);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const lines = createReceiptLines(printRun);
    let lineIndex = 0;
    const startTimer = window.setTimeout(() => setIsPrinting(true), 650);
    const printTimer = window.setInterval(() => {
      const nextLine = lines[lineIndex];
      if (!nextLine) {
        window.clearInterval(printTimer);
        setIsPrinting(false);
        return;
      }
      setPrintedLines((current) => [...current, nextLine]);
      lineIndex += 1;
    }, 150);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(printTimer);
    };
  }, [isOpen, printRun]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const activate = () => {
    if (isOpen) {
      dismiss();
      return;
    }
    setPrintedLines([]);
    setPrintRun((current) => current + 1);
    setIsOpen(true);
  };

  const printer = (
    <div className={`fiscal-printer  relative z-20 flex w-[62px] flex-col items-center sm:w-[92px] ${isOpen ? 'is-open' : ''} ${isOpen ? '' : 'bg-[aliceblue] rounded-[50%]'}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`fiscal-printer__button group relative block w-full cursor-pointer border-0 bg-transparent p-0 ${isPrinting ? 'is-printing' : ''}`}
        onClick={activate}
        aria-label={isOpen ? 'Close fiscal printer demonstration' : 'Open fiscal printer demonstration'}
        aria-describedby="fiscal-printer-hint"
      >
        <span className="fiscal-printer__halo" aria-hidden="true" />
        <Image
          src="/res/fiscal-printer.png"
          alt=""
          width={512}
          height={512}
          className="relative z-10 h-auto w-full drop-shadow-[0_18px_14px_rgba(19,27,46,0.2)] transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
        />
        <span className="fiscal-printer__slot" aria-hidden="true" />
        <span className="fiscal-printer__wind fiscal-printer__wind--one" aria-hidden="true" />
        <span className="fiscal-printer__wind fiscal-printer__wind--two" aria-hidden="true" />
        <span className="fiscal-printer__wind fiscal-printer__wind--three" aria-hidden="true" />
        {isOpen && printedLines.length > 0 && (
          <span className="fiscal-printer__receipt" aria-hidden="true">
            <span className="fiscal-printer__receipt-body">
              {printedLines.map((receiptLine, index) => (
                <span className={`fiscal-printer__receipt-line ${receiptLine[1]}`} key={`${receiptLine[0]}-${index}`}>
                  {receiptLine[0]}
                </span>
              ))}
            </span>
            <span className="fiscal-printer__receipt-edge" />
          </span>
        )}
      </button>
      <span id="fiscal-printer-hint" className="mt-1 text-center font-label-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant/75">
        {isOpen ? 'X' : ''}
      </span>
      <span className="sr-only" role="status" aria-live="polite">{isPrinting ? 'Printing a sample fiscal receipt.' : ''}</span>
    </div>
  );

  return (
    <>
      {!isOpen && printer}
      {isOpen && (
        <>
          <button type="button" className="fiscal-printer__backdrop" aria-label="Close receipt demonstration" onClick={dismiss} />
          <div
            className="fiscal-printer__stage"
            role="dialog"
            aria-modal="true"
            aria-label="Fiscal receipt demonstration"
            onClick={dismiss}
          >
            <button type="button" className="fiscal-printer__close" aria-label="Close receipt demonstration" onClick={dismiss}>
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
            <div onClick={(event) => event.stopPropagation()}>{printer}</div>
          </div>
        </>
      )}
    </>
  );
}
