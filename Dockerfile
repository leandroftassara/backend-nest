# Use a imagem Node.js oficial
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o prisma como uma dependência global
RUN npm install -g prisma

# Copie o restante dos arquivos do projeto
COPY . .

# Gere os clientes Prisma e aplique as migrations
RUN prisma generate
RUN prisma migrate deploy

# Compile o projeto
RUN npm run build

# Exponha a porta que o aplicativo vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]