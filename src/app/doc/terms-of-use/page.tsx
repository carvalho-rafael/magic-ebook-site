import Navbar from "@/components/checkout/Navbar";
import Footer from "@/components/checkout/Footer";

const TermsOfUse = async () => {
  return (
    <div className="prose max-w-full">
      <Navbar />
      <div className="p-4 bg-[url(/assets/bg-pattern.jpg)] min-h-screen">
        <div className="max-w-[800px] m-auto bg-white py-6 px-4 shadow">
          <h1>TERMOS DE USO</h1>

          <p>Última atualização: 25/06/2025</p>

          <p>
            Ao adquirir e utilizar a plataforma Magic Ebook, você concorda com
            os seguintes termos e condições. Leia com atenção.
          </p>

          <p>1. Aceitação dos Termos</p>
          <p>
            Ao efetuar a compra ou venda do produto digital, o(a) usuário(a)
            declara que leu, compreendeu e aceitou estes Termos de Uso.
          </p>

          <p>2. Licença de Uso</p>
          <p>
            O produto digital adquirido é licenciado para uso pessoal e
            intransferível. É proibida a reprodução, distribuição, revenda ou
            compartilhamento, total ou parcial, sob qualquer forma, sem
            autorização expressa por escrito.
          </p>

          <p>3. Entrega do Produto</p>
          <p>
            O produto digital será disponibilizado imediatamente após a
            confirmação do pagamento, por meio de download ou envio por e-mail.
            Certifique-se de fornecer os dados corretos no momento da compra.
          </p>

          <p>4. Direitos Autorais</p>
          <p>
            Todo o conteúdo do produto digital é protegido por leis de direitos
            autorais e pertence exclusivamente ao vendedor/criador. Qualquer uso
            não autorizado poderá resultar em medidas legais.
          </p>

          <p>5. Reembolso</p>
          <p>
            Devido à natureza digital do produto, não oferecemos reembolso após
            a entrega, salvo em casos de defeito no arquivo ou problemas
            comprovados de acesso, conforme previsto no Código de Defesa do
            Consumidor.
          </p>

          <p>6. Responsabilidade</p>
          <p>
            Nos isentamos de qualquer responsabilidade por eventuais danos
            decorrentes do uso indevido do produto ou interpretação incorreta do
            conteúdo por parte do usuário.
          </p>

          <p>7. Autoria do produto</p>
          <p>
            Não é permitido pirataria de qualquer natureza. O vendedor (a) tem
            total responsabilidade pelo produto comercializado e deve ser o
            autor do mesmo.
          </p>

          <p>8. Suporte</p>
          <p>
            Caso tenha dúvidas ou enfrente dificuldades técnicas, oferecemos
            suporte via email (contato@magicebook.com.br), em horário comercial,
            dentro de um prazo de até 15 dias após a compra.
          </p>

          <p>9. Alterações nos Termos</p>
          <p>
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento, sem aviso prévio. Recomendamos que os usuários revisem
            periodicamente esta seção.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
