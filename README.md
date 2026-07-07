# CONNECTech 2026 — Landing Page v2

Landing page da **CONNECTech 2026 — Conferência de Tecnologia do ICET/UFAM**.

A versão foi reorganizada para ficar mais próxima da identidade institucional do CONNECTech 2025, com ajustes para 2026: três temas visuais, melhor responsividade, chamadas de trabalho mais completas, página separada para edições anteriores e acessibilidade funcional.

## Como executar

Você pode abrir o `index.html` diretamente no navegador.

Recomendado para desenvolvimento local:

```bash
npm run dev
```

O servidor tenta iniciar na porta `5173`. Se ela estiver ocupada, ele usa a próxima porta livre.

Também funciona com Python:

```bash
python3 -m http.server 5173
```

Acesse:

```text
http://localhost:5173
```

## Estrutura

```text
connectech-2026-v2/
├── index.html
├── anais.html
├── 404.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── img/
│       ├── connectech-logo-full.png
│       ├── connectech-logo-symbol.png
│       ├── connectech-symbol-small.png
│       ├── icet-logo.png
│       ├── ufam-logo.png
│       ├── eng-software-logo.png
│       ├── sbc-logo.png
│       ├── navir-logo.png
│       ├── logar-logo.png
│       ├── casi-logo.png
│       ├── realizacao-logos-row.png
│       └── evento/
│           └── amazonas-mosaico.png
├── scripts/
│   └── dev-server.mjs
├── package.json
├── .env.example
└── .gitignore
```

## Temas

O botão no navbar alterna entre três temas:

1. **Aurora**: tema padrão, com base escura, azul, ciano, rosa e roxo.
2. **Dark**: tema azul escuro institucional, sem fundos brancos.
3. **Light**: tema claro, com fundos brancos e cinzas claros.

Os ícones mudam automaticamente:

- estrela: Aurora;
- lua: Dark;
- sol: Light.

A preferência fica salva no `localStorage`.

## Conteúdo principal

A página principal contém:

- Início;
- Sobre;
- Programação;
- Chamada para Trabalhos;
- Trilhas;
- Organização;
- Comitê Científico;
- Perguntas Frequentes;
- Footer.

As **edições anteriores** ficam na página separada `anais.html`, acessível pelo navbar.

## Links configurados

- JEMS3/SBC: `https://jems3.sbc.org.br/?returnUrl=%2Fevents%2F343`
- Templates SBC: `https://www.sbc.org.br/documentosinstitucionais/#relacoes-profissionais`
- Anais SBC: `https://sol.sbc.org.br/index.php/connect`
- CONNECTech 2025: `https://projetosufam.com.br/connectech2025/`
- CONNECTech 2024: `https://projetosufam.com.br/connectech2024/`
- UFAM: `https://ufam.edu.br/`
- ICET: `https://www.icet.ufam.edu.br/`
- CASI: `https://www.instagram.com/casi_ufam/`
- Engenharia de Software: `https://www.icet.ufam.edu.br/ultimas-noticias/117-engenharia-de-software-it16.html`
- Sistemas de Informação: `https://www.icet.ufam.edu.br/ultimas-noticias/122-sistemas-de-informacao-it01.html`
- SBC: `https://www.sbc.org.br/`
- Instituto Eldorado: `https://www.eldorado.org.br/`

## Substituição de imagens

A imagem do Amazonas usada na seção “Sobre” está em:

```text
assets/img/evento/amazonas-mosaico.png
```

Substitua esse arquivo por uma versão final criada no Figma, Photoshop ou Illustrator, usando fotos reais do evento.

Recomendação:

- formato: PNG ou WebP;
- largura aproximada: 900px a 1400px;
- fundo transparente, se possível;
- manter proporção horizontal, para encaixar bem no layout.

## Acessibilidade

O botão de acessibilidade permite:

- aumentar ou reduzir fonte;
- ativar alto contraste;
- reduzir animações.

Também há:

- link “Pular para o conteúdo”;
- foco visível;
- botões com `aria-label`;
- menu mobile com `aria-expanded`;
- suporte a `prefers-reduced-motion`.

## Observações de manutenção

- O botão “Inscrições” está desabilitado até o link do Even3 ser definido.
- O e-mail no footer está definido como `connectech.icet@gmail.com`. Troque pelo contato oficial caso a organização use outro endereço.
- A logo do Instituto Eldorado está como texto estilizado. Substitua por imagem oficial caso seja disponibilizada.
- As logos devem ser mantidas em `assets/img/`.

## Publicação

Para publicar, envie para o servidor:

```text
index.html
anais.html
404.html
css/
js/
assets/
```

Não é necessário enviar `node_modules`, porque não há dependências locais.
