#!/usr/bin/env bash
set -e
STAMP=$(date +"%Y%m%d-%H%M%S")
OUT="/var/backups/desa-admin/$STAMP"
mkdir -p "$OUT"

# Backup MongoDB (adjust URI/DB name)
mongodump --uri="$MONGO_URI" --out="$OUT/mongodump"

# Arsip uploads
tar -czf "$OUT/uploads.tar.gz" -C /var/www/desa-admin/uploads .

# Optional: upload ke S3/MinIO via mc (jika ada)
# mc cp -r "$OUT" myminio/bucket-desadesa/backup/

# Retensi 7 hari
find /var/backups/desa-admin -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \;


# CRONTAB SCRIPT
# Backup tiap malam jam 01:10
# 10 1 * * * MONGO_URI="mongodb+srv://user:pass@cluster/db" bash /var/www/desa-admin/infra/backup/backup.sh >> /var/log/desa-backup.log 2>&1
