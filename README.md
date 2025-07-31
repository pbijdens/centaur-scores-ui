# Installation steps for the Centaur Scores UI

## Requirements

- Apache2 with mod rewrite
- A running 'CentaurScores API' server on port 8062 on the same host that this service runs on.
  *curently hardcoded, will probably put this in a settings json file*
- The API server requires MySQL and .NET 8 runtimes; it has its own installation instructions.

## Create a release

To create a release:

```sh
npm run build-cs
```

Then copy the contents of the ```dist/centaur-scores-ui/browser/``` folder to your apache2 server, e.g. in ```/var/www/centaurscoresui```.

## First install

Assuming you already installed the API server and copied the ```dist/centaur-scores-ui/browser/``` folder contents into ```/var/www/centaurscoresui```:

Create a file ```/etc/apache2/conf-available/centaurscores.conf``` with these contents:

```conf
<IfModule alias_module>
    Alias /cs /var/www/centaurscoresui
    Alias /assets /var/www/centaurscoresui/assets
</IfModule>

<Directory "/var/www/centaurscoresui">
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /cs
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . index.html [L]
</IfModule>
</Directory>

<Location "/cs/">
    Require all granted
</Location>
<Location "/assets/">
    Require all granted
</Location>
```

The rewrite engine configuration is required because of angular's internal routing, where for most routes no target file exists. All those routes are internally redirected to the index file.

Then run these commands to enable the rewrite module, enable above configuration file and restart apache2.

```
sudo a2enmod rewrite
sudo a2enconf centaurscores
sudo apache2ctl restart
```

You should now be able to reach the UI at http://<your-ip>/cs

You can map assets to any folder so you can start overriding configurations and logos.

## Scripts

Use this script to install a new version of this centaur scores UI

```bash
#!/bin/bash
npm install
npm run build-cs
cp -R dist/centaur-scores-ui/browser/* /var/www/centaurscoresui/
```

Use this script to install a new version of the backend; run this from the ```centaur-scores-api/CentaurScores``` project-folder:

```bash
#!/bin/bash
sudo systemctl stop centaurscoresapi
dotnet publish -o /var/www/centaurscoresapi
sudo systemctl start centaurscoresapi
```

