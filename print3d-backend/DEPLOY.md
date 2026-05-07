# Deploy — print3d-backend no Railway

## 1. Criar conta no Cloudinary (gratuito)
1. Acesse https://cloudinary.com e crie uma conta grátis
2. No Dashboard copie:
   - Cloud Name
   - API Key
   - API Secret

## 2. Subir o back-end no Railway
1. Acesse https://railway.app e crie uma conta
2. Clique em "New Project" → "Deploy from GitHub"
3. Conecte seu GitHub e suba a pasta `print3d-backend`
4. O Railway detecta o Maven automaticamente

## 3. Configurar variáveis no Railway
Vá em Settings → Variables e adicione:

| Variável                | Valor                                      |
|-------------------------|--------------------------------------------|
| CLOUDINARY_CLOUD_NAME   | (do dashboard do Cloudinary)               |
| CLOUDINARY_API_KEY      | (do dashboard do Cloudinary)               |
| CLOUDINARY_API_SECRET   | (do dashboard do Cloudinary)               |
| CORS_ORIGINS            | http://localhost:5173,https://SEU.netlify.app |
| H2_CONSOLE              | false                                      |

## 4. Copiar a URL do Railway
Após o deploy, o Railway gera uma URL como:
  https://print3d-backend-production.up.railway.app

Copie essa URL — você vai precisar dela no front-end.

## 5. Configurar o front-end
Abra `print3d-frontend/.env.production` e troque:
  VITE_API_URL=https://print3d-backend-production.up.railway.app

## 6. Deploy do front-end no Netlify
1. Acesse https://netlify.com → "Add new site" → "Import from Git"
2. Aponte para a pasta `print3d-frontend`
3. Configure:
   - Build command:    npm run build
   - Publish directory: dist
4. Em Site Settings → Environment Variables adicione:
   VITE_API_URL = https://print3d-backend-production.up.railway.app
5. Clique em Deploy

## 7. Atualizar CORS no Railway
Agora que tem a URL do Netlify, volte ao Railway e atualize:
  CORS_ORIGINS = http://localhost:5173,https://SEU-SITE-REAL.netlify.app

Pronto! O site está no ar.
