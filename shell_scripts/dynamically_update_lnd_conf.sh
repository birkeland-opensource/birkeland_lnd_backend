#!/bin/bash

# Function to install jq
install_jq() {
  echo "Attempting to install jq..."

  if [ -x "$(command -v apt-get)" ]; then
    sudo apt-get update
    sudo apt-get install -y jq
  elif [ -x "$(command -v yum)" ]; then
    sudo yum install -y jq
  elif [ -x "$(command -v dnf)" ]; then
    sudo dnf install -y jq
  elif [ -x "$(command -v brew)" ]; then
    brew install jq
  else
    echo "Error: Package manager not found. Please install jq manually." >&2
    exit 1
  fi
}

# Check if jq is installed, if not, install it
if ! [ -x "$(command -v jq)" ]; then
  install_jq
fi

# Check for input JSON string
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 '<input_json_string>'"
  exit 1
fi

input_json_string="$1"

lnd_conf_file="/root/.lnd/lnd.conf"

if [ -e "$lnd_conf_file" ]; then
  echo "File exists, removing $lnd_conf_file"
  rm "$lnd_conf_file"
else
  echo "File not found, skipping removal."
fi


# Create or update lnd.conf
touch "$lnd_conf_file"

# Read JSON data and update lnd.conf
while read -r key value; do
  # Remove quotes from key and value
  key=$(echo "$key" | tr -d '"')
  value=$(echo "$value" | tr -d '"')

  # If the key is already in the file, update the value
  if grep -q "^$key=" "$lnd_conf_file"; then
    sed -i "s/^$key=.*/$key=$value/" "$lnd_conf_file"
  else
    # If the key is not in the file, add it
    echo "$key=$value" >> "$lnd_conf_file"
  fi
done < <(echo "$input_json_string" | jq -r 'to_entries | .[] | .key + " " + .value')

echo "lnd.conf has been updated."
