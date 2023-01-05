 if ! [[ -x "$(command -v docker)" ]]; then
    echo "Docker not installed"
 fi

 else 
    echo "Trying to install docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    chmod +x get-docker.sh
    sh get-docker.sh
    rm get-docker.sh