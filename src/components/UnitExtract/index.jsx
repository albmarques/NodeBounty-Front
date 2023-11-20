import React from 'react';
import styles from './styles.module.css';
import { api } from '@lib/api.js';
import dayjs from 'dayjs';
import { Loading } from '@components/Loading';
import jsPDF from 'jspdf';
import font from "@assets/inter.ttf";
import fontBold from "@assets/inter-Bold.ttf";
import nodeimage from "@assets/logo-decorator.png";
import { Sticker } from 'phosphor-react';

export function UnitExctract({ data, owner }) {
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.addFont(fontBold, fontBold, 'normal');

    // Defina a fonte para o documento
    pdf.setFont(fontBold);
    pdf.setFontSize(30);

    // Adiciona uma moldura à página inteira
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setDrawColor(35, 65, 73); // Cor da borda (preto)
    pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Adiciona texto ao PDF dentro da moldura
    pdf.text('Comprovante NodeBounty', 20, 20);

    pdf.setFontSize(20);
    pdf.addFont(font, font, 'normal');

    // Defina a fonte para o restante do documento
    pdf.setFont(font);

    pdf.text(`Data da Transação: ${dayjs(data.transacao.dataTransacao).format('DD/MM/YYYY')}`, 20, 70);
    pdf.text(`Descrição: ${data.transacao.emissor === null
      ? 'Depósito'
      : data.transacao.receptor === null
        ? 'Saque'
        : 'Transferência entre contas'}`, 20, 80);

    if (data.transacao.emissor && data.transacao.receptor) {
      pdf.text(`Enviada por: ${data.transacao.emissor.cliente.nome}`, 20, 110);
      pdf.text(`Recebida por: ${data.transacao.receptor.cliente.nome}`, 20, 120);
    }

    pdf.text(`Valor: ${formatarValor(data.transacao.valorTransacao)}`, 20, 130);

    // Adiciona a imagem ao canto inferior direito
    const imageWidth = 50;
    const imageHeight = 50;
    pdf.addImage(nodeimage, 'PNG', pageWidth - imageWidth - 10, pageHeight - imageHeight - 10, imageWidth, imageHeight);

    // Salva o PDF
    pdf.save('extrato_bancario.pdf');
  };

  function formatarValor(number) {
    return number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <div className={styles.transacaoContainer}>
      <div className={styles.transacao}>
        <div className={styles.data}>{dayjs(data.transacao.dataTransacao).format('DD/MM/YYYY')}</div>
        <div className={styles.descricao}>
          {data.transacao.emissor === null
            ? 'Depósito'
            : data.transacao.receptor === null
              ? 'Saque'
              : 'Transferência'}
          {data.transacao.emissor && data.transacao.receptor && (
            <>
              {data.transacao.emissor.cliente.idCliente === owner && (
                <> enviada para {data.transacao.receptor.cliente.nome}</>
              )}
              {data.transacao.receptor.cliente.idCliente === owner && (
                <> recebida por {data.transacao.emissor.cliente.nome}</>
              )}
            </>
          )}
        </div>
        <div className={styles.valor}>{formatarValor(data.transacao.valorTransacao)}<button className={styles.btn} onClick={generatePDF}>Gerar comprovante</button></div>
      </div>
    </div>
  );
}
