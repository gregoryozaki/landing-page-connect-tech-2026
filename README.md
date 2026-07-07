# CONNECT Tech 2026

Landing page oficial do **CONNECT Tech 2026 — Conferência de Tecnologia do ICET/UFAM**, desenvolvida em HTML, CSS e JavaScript puro.

O projeto apresenta informações do evento, programação, chamada para trabalhos, trilhas de submissão, organização, comitê científico, edições anteriores, recursos de acessibilidade e alternância de temas visuais.

---

## Sobre o evento

O **CONNECT Tech** é um evento científico e tecnológico sem fins lucrativos, organizado no Instituto de Ciências Exatas e Tecnologia da Universidade Federal do Amazonas.

A edição de 2026 será realizada em **Itacoatiara-AM**, com o tema:

> Avanço exponencial de tecnologias, letramento digital e consumo sustentável da IA.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap Icons
- Google Fonts
- Node.js, apenas para servidor local de desenvolvimento

---

## Estrutura do projeto

```txt
.
├── 404.html
├── anais.html
├── assets
│   └── img
│       ├── cards
│       ├── evento
│       ├── logos
│       ├── sobre
│       └── logos institucionais
├── css
│   └── styles.css
├── index.html
├── js
│   └── script.js
├── package.json
├── README.md
└── scripts
    └── dev-server.mjs
```

---

## Páginas

### `index.html`

Página principal do CONNECT Tech 2026.

Contém:

- seção inicial do evento;
- seção sobre;
- programação;
- chamada para trabalhos;
- trilhas de submissão;
- organização;
- comitê científico;
- FAQ;
- rodapé institucional;
- painel de acessibilidade;
- modal das trilhas.

### `anais.html`

Página com edições anteriores do CONNECT Tech.

Contém links para:

- CONNECT Tech 2025;
- CONNECT Tech 2024;
- anais publicados na plataforma SOL/SBC.

### `404.html`

Página personalizada para erro 404.

---

## Como executar localmente

É necessário ter o Node.js instalado.

Instale ou apenas execute diretamente:

```bash
npm run dev
```

ou:

```bash
npm start
```

O servidor será iniciado em:

```txt
http://localhost:5173
```

Caso a porta esteja em uso, o servidor tentará automaticamente a próxima porta disponível.

---

## Configuração de porta

O projeto usa a variável `PORT` para definir a porta do servidor local.

Exemplo de arquivo `.env`:

```env
PORT=5173
```

---

## Arquivos principais

### `css/styles.css`

Arquivo principal de estilos do projeto.

Responsável por:

- temas visuais;
- layout responsivo;
- header;
- hero;
- seção sobre;
- cards da programação;
- trilhas;
- organização;
- comitê científico;
- FAQ;
- rodapé;
- modal;
- painel de acessibilidade;
- animações;
- ajustes responsivos.

### `js/script.js`

Arquivo principal de comportamento.

Responsável por:

- alternância de temas;
- troca dinâmica da logo principal;
- menu mobile;
- botão voltar ao topo;
- animações de entrada;
- FAQ expansível;
- modal das trilhas;
- carrossel de organização;
- carrosséis dos cards de programação;
- painel de acessibilidade;
- aumento e redução de fonte;
- alto contraste;
- leitura da página em voz alta.

### `scripts/dev-server.mjs`

Servidor local simples em Node.js para desenvolvimento.

Ele serve arquivos estáticos do projeto e exibe a página `404.html` quando uma rota não é encontrada.

---

## Temas disponíveis

O site possui três temas:

- `light` — tema claro padrão;
- `dark` — tema escuro;
- `aurora` — tema visual com tons de destaque.

O botão de tema alterna na seguinte ordem:

```txt
light → dark → aurora → light
```

A preferência do usuário é salva no `localStorage`.

---

## Acessibilidade

O projeto possui um painel de acessibilidade com:

- aumento de fonte;
- redução de fonte;
- leitura da página e das descrições das imagens;
- alto contraste;
- botão de voltar ao topo;
- link de pular para o conteúdo.

Para melhor funcionamento da leitura em voz alta, recomenda-se o uso do Google Chrome.

---

## Assets

As imagens do projeto ficam em:

```txt
assets/img
```

Principais pastas:

```txt
assets/img/logos
assets/img/cards
assets/img/sobre
assets/img/evento
```

### Logos principais

```txt
assets/img/logos/connectech-logo-navbar.png
assets/img/logos/connectech-logo-footer.png
assets/img/logos/logo-light.png
assets/img/logos/logo-dark.png
assets/img/logos/logo-aurora.png
```

### Imagens da seção Sobre

```txt
assets/img/sobre/foto-01.png
assets/img/sobre/foto-02.png
...
assets/img/sobre/foto-12.png
```

### Imagens da programação

```txt
assets/img/cards/img palestra
assets/img/cards/img cursos
assets/img/cards/img integração
```

---

## Links importantes

### Inscrições

```txt
https://www.even3.com.br/iii-connect-tech-conferencia-de-tecnologia-do-icet-758212/
```

### Submissões

```txt
https://jems3.sbc.org.br/?returnUrl=%2Fevents%2F343
```

### Templates SBC

```txt
https://www.sbc.org.br/documentosinstitucionais/#relacoes-profissionais
```

### Anais

```txt
https://sol.sbc.org.br/index.php/connect
```

---

## Organização

O CONNECT Tech 2026 é organizado por professores, discentes e centros acadêmicos dos cursos de Engenharia de Software e Sistemas de Informação do ICET/UFAM.

Apoio institucional:

- ICET/UFAM;
- Universidade Federal do Amazonas;
- Sociedade Brasileira de Computação;
- CASI;
- NAVIR;
- LOGAR;
- DevSociety;
- parceiros e patrocinadores.

---

## Coordenação

**Felipe Gomes de Oliveira**
(UFAM) — [felipeoliveira@ufam.edu.br](mailto:felipeoliveira@ufam.edu.br)

**Rainer Xavier de Amorim**
(UFAM) — [raineramorim@ufam.edu.br](mailto:raineramorim@ufam.edu.br)

---

## Desenvolvedores

**Gregory Gabriel Ozaki Coelho**
(UFAM) — [gregory.coelho@ufam.edu.br](mailto:gregory.coelho@ufam.edu.br)

**Brayner Santana Brito**
(UFAM) — [brayner.brito@ufam.edu.br](mailto:brayner.brito@ufam.edu.br)

---

## Endereço

Instituto de Ciências Exatas e Tecnologia
Universidade Federal do Amazonas
Rua Nossa Senhora do Rosário, 3863
CEP 69.103-128
Itacoatiara - AM

---

## Convenções do projeto

- Manter nomes de arquivos em letras minúsculas sempre que possível.
- Evitar espaços em novos nomes de arquivos.
- Manter imagens dentro de `assets/img`.
- Manter estilos apenas em `css/styles.css`.
- Manter scripts apenas em `js/script.js`.
- Não inserir CSS ou JavaScript diretamente no HTML, exceto em casos simples como a página `404.html`.
- Não usar links `href="#"` para logos sem página oficial; usar `span` nesses casos.
- Manter o tema padrão como `light`.

---

## Desenvolvimento

Para iniciar o servidor local:

```bash
npm run dev
```

Para acessar no navegador:

```txt
http://localhost:5173
```

Para parar o servidor:

```bash
Ctrl + C
```

---

## Status

Projeto em desenvolvimento para a edição 2026 do CONNECT Tech.

Últimas melhorias aplicadas:

- padronização visual dos temas;
- atualização do rodapé institucional;
- painel de acessibilidade;
- carrosséis de imagens na programação;
- carrossel da organização;
- modal das trilhas;
- página de edições anteriores;
- página 404 personalizada;
- limpeza de código duplicado e ajustes de responsividade.

---

## Licença

Projeto desenvolvido para fins institucionais e acadêmicos do CONNECT Tech 2026 — ICET/UFAM.
