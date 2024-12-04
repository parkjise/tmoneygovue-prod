#!/bin/bash

# deploy step
echo "** deploy start **"
echo "** 1. backup build file **"
cd /sorc001/mid2/web/tgospa
# 날짜 형식의 백업 폴더 이름
backup_folder="/sorc001/mid2/web/backup/backup$(date +%Y.%m.%d-%H%M)"

if [ ! -d "$backup_folder" ]; then
    mkdir -p "$backup_folder"   # 폴더가 없으면 생성
fi
# tgospa 폴더의 내용을 백업 폴더로 복사
cp -r /sorc001/mid2/web/tgospa/*  "$backup_folder/"

# 배포 파일 복사 
# 2. 소스 배포
echo "** 2. deploy tgo build file **"
cd /sorc001/mid2/web/tgospa_upload
cp -r dist/assets/ /sorc001/mid2/web/tgospa/assets2
cp dist/index.html /sorc001/mid2/web/tgospa/index2.html

# 3. 이전 폴더 삭제
echo "** 3. Delete the previous folder **"
cd /sorc001/mid2/web/tgospa
rm -rf assets
mv assets2 assets 
rm -rf index.html
mv index2.html index.html

echo "** delete tgo pre build file end **"
rm -rf /sorc001/mid2/web/tgospa/tgospa_upload/*

# 4. 백업된 경로에서 가장 최근 생성된 폴더 중 상위 4개 제외 나머지 폴더 삭제 처리 
# 기준 경로
base_path="/sorc001/mid2/web/backup"
cd "$base_path" || exit 1
ls -dt */ | tail -n +5 | xargs -r rm -r

echo "** deploy end **"

