cp config.pro.toml target/
go build -o target/main
cd target
rm /tmp/*.zip
zip -r -y /tmp/1.zip *

