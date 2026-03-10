FROM python:3.12-slim

# Install Chrome
RUN apt-get update && apt-get install -y \
    wget gnupg2 unzip \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY dubainight_scraper.py .
COPY party_finder_scraper.py .
COPY platinumlist_scraper.py .
COPY supabase_config.py .
COPY credentials.json .
COPY run_all_cloud.sh .
RUN chmod +x run_all_cloud.sh

CMD ["./run_all_cloud.sh"]
