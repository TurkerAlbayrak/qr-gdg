'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'QR kodların geçerlilik süresi dolar mı?',
    answer:
      'Hayır. QRKolay ile oluşturulan tüm QR kodlar doğrudan içeriğin kendisine kodlanan "statik" formatta üretilir. Sunucuya bağımlı değildir ve süresiz olarak ömür boyu çalışır.',
  },
  {
    question: 'Hizmet gerçekten ücretsiz mi?',
    answer:
      'Evet. QRKolay tamamen ücretsizdir. Günlük limit veya kota yoktur. Üyelik, kart bilgisi ya da abonelik talep edilmez.',
  },
  {
    question: 'Wi-Fi QR kodu nasıl çalışır?',
    answer:
      'Misafirleriniz telefon kamerasını QR koda doğrulttuğunda "Ağa Bağlan" bildirimi belirir. Şifre girmeden tek dokunuşla kablosuz ağa bağlanırlar.',
  },
  {
    question: 'Instagram\'da QR kodu nasıl paylaşabilirim?',
    answer:
      'Instagram Web doğrudan hikaye yüklemeye izin vermediği için QRKolay görseli cihazınıza indirir ve Instagram Hikaye/Gönderi ekranında seçmeniz için adımları gösterir.',
  },
  {
    question: 'vCard dijital kartvizit nedir?',
    answer:
      'vCard, uluslararası standart bir kişi kartı formatıdır. Taranınca adınızı, telefonunuzu, e-postanızı ve şirketinizi tek tuşla rehbere kaydeder.',
  },
  {
    question: 'Baskı için PNG mi yoksa SVG mi indirmeliyim?',
    answer:
      'Web ve sosyal medya için PNG yeterlidir. Ancak broşür, kartvizit, menü veya tabela gibi matbaa baskılarında boyutu büyütüldüğünde bozulmayan vektörel SVG dosyasını tercih edin.',
  },
  {
    question: 'Verilerim sunucularınıza kaydediliyor mu?',
    answer:
      'Hayır. QR üretimi tamamen tarayıcınızda (istemci tarafında) gerçekleşir. Wi-Fi şifreniz veya kişisel bilgileriniz hiçbir sunucuya iletilmez.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            QR kodlar ve ücretsiz kullanım hakkında merak edilenler.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-zinc-900 dark:text-zinc-100' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
