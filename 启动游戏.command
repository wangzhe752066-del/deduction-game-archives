#!/bin/zsh
# 进入游戏目录，确保双击启动时也能找到项目文件。
cd "${0:A:h}" || exit 1

if ! command -v npm >/dev/null 2>&1; then
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
fi
if ! command -v npm >/dev/null 2>&1; then
  print "未找到 Node.js / npm，请安装 Node.js 后再启动游戏。"
  read "?按回车关闭窗口。"
  exit 1
fi

# 已启动时直接打开游戏，避免重复占用端口。
if curl --noproxy '*' --silent --fail http://127.0.0.1:5173/ | /usr/bin/grep -q '夜班档案'; then
  open http://127.0.0.1:5173/
  exit 0
fi

if [[ ! -d node_modules ]]; then
  npm ci || exit 1
fi

print "正在启动《夜班档案》。游戏期间请保留此终端窗口。"
# 等服务就绪后打开浏览器。
(
  for attempt in {1..40}; do
    if curl --noproxy '*' --silent --fail http://127.0.0.1:5173/ | /usr/bin/grep -q '夜班档案'; then
      open http://127.0.0.1:5173/
      exit 0
    fi
    sleep 0.5
  done
) &
npm run dev -- --host 127.0.0.1
