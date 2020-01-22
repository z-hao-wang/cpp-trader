docker run -d --restart unless-stopped -v ~/.ssh/id_rsa:/root/.ssh/id_rsa --name=keyserver \
  mdsol/docker-ssh-exec -server || true
docker build -t cpptrader:$1 .
