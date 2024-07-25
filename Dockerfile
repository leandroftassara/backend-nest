FROM node:20

WORKDIR /app

# Copiar os arquivos base
COPY package*.json ./

# Instalar as dependências
RUN npm install
RUN npm install -g @nestjs/cli

# Copiar o restante dos arquivos
COPY prisma ./prisma/
COPY . .

# Gerar os clientes Prisma
RUN npx prisma generate

# Compilar o projeto
RUN npm run build

# Expor a rota
EXPOSE 3000

# Iniciar o app
CMD ["npm", "run", "start:migrate-dev"]