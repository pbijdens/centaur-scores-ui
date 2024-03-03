# CentaurScoresUi

##

Requirement:
- Apache2
- A running 'CentaurScores API' server on port 8062 on the same host that this service runs on.
  *curently hardcoded, will probably put htis in a settings json file*
- The API server requires MySQL and .NET 8 runtimes; it has its own installation instructions.

## Create a release

To create a release:

```
npm run build-cs
```

Then copy the contents of the dist folder to your apache2 server, e.g. in ```/var/www/centaurscoresui```.

## First install

Assuming you already installed the API server and copied the dist-folder contents into ```/var/www/centaurscoresui```:

Create a file ```/etc/apache2/conf-available/centaurscores.conf``` with these contents:

```conf
<IfModule alias_module>
    Alias /cs /var/www/centaurscoresui
</IfModule>

<Directory "/var/www/centaurscoresui">
    FallbackResource ./index.html
    Options Indexes FollowSymLinks
    Require all granted
    AllowOverride All
</Directory>

<Location "/cs/">
    Require all granted
</Location>
```

The FallbackResource is needed because of angular routing.

Then run the command:

```
sudo a2enconf centaurscores
sudo systemctl restart apache2
```

You should now be able to reach the UI at http://<your-ip>/cs

