# Use a imagem Node.js oficial
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./
RUN npm install
COPY . .

# Compile o projeto
RUN prisma migrate deploy && prisma generate && npm run build

# Exponha a porta que o aplicativo vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]