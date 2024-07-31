#!/bin/bash

ENV_FILE=".env"

# Limpa o arquivo .env existente
> $ENV_FILE

# Função para buscar e exportar uma variável de ambiente do Parameter Store
export_parameter() {
  PARAM_NAME=$1
  # Remove o prefixo DEV- para a variável do arquivo .env
  VAR_NAME=${PARAM_NAME#DEV-}
  # Obtém o valor do parâmetro
  PARAM_VALUE=$(aws ssm get-parameter --name "$PARAM_NAME" --with-decryption --query "Parameter.Value" --output text)
  # Escreve a variável no arquivo .env
  echo "$VAR_NAME=$PARAM_VALUE" >> $ENV_FILE
}

# Lista de parâmetros a serem exportados
PARAMETERS=("DEV-DATABASE_URL" "DEV-AWS_SES_ACCESS_KEY" "DEV-AWS_SES_SECRET_KEY" "DEV-AWS_SES_REGION" "DEV-AWS_SES_ACCOUNT_SENDER")

# Loop para exportar cada parâmetro
for PARAM in "${PARAMETERS[@]}"; do
  export_parameter $PARAM
done