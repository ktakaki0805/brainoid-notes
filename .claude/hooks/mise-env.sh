#!/usr/bin/env bash
# Claude Codeのセッション開始時に呼ばれる（.claude/settings.json の SessionStart）。
#
# Claude Codeは、コマンドを実行するたびに $CLAUDE_ENV_FILE を読み込む。そこに mise の読み込みを
# 1行足して、mise.toml の道具（node、pnpm）と環境変数（.env）が、Claude Codeのコマンドにも
# 効くようにする。対話用のシェルの設定（mise activate）は、Claude Codeのコマンドには効かない。
#
# 参考：https://mise.jdx.dev/agents.html

[ -n "${CLAUDE_ENV_FILE:-}" ] || exit 0

mise_bin="$(command -v mise 2>/dev/null || true)"
[ -n "$mise_bin" ] || mise_bin="$HOME/.local/bin/mise"
# miseが入っていなければ、何もしない（手元の node と pnpm がそのまま使われる）
[ -x "$mise_bin" ] || exit 0

case "${SHELL:-}" in
  */zsh) shell_name=zsh ;;
  *) shell_name=bash ;;
esac

printf 'eval "$(%q hook-env -s %s)"\n' "$mise_bin" "$shell_name" >> "$CLAUDE_ENV_FILE"
exit 0
