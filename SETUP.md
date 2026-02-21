# Auto-Reload Setup (Optional)

For the best experience, you can set up automatic alias reloading so your changes apply immediately when you quit.

## One-Time Setup

Add this function to your `~/.zshrc` or `~/.bashrc`:

```bash
# alias-cli with auto-reload
alias-cli-reload() {
  command alias-cli
  if [ -f ~/.alias-cli-reload ]; then
    source "$(cat ~/.alias-cli-reload)"
    rm ~/.alias-cli-reload
  fi
}
alias alias-cli='alias-cli-reload'
```

Then reload your shell:
```bash
source ~/.zshrc  # or ~/.bashrc
```

## How It Works

1. When you make changes and quit, alias-cli writes your config path to `~/.alias-cli-reload`
2. The wrapper function detects this file and sources it automatically
3. Your aliases are ready to use immediately!

## Without Setup

If you prefer not to add the wrapper, you can always manually reload:

```bash
source ~/.zshrc
```

The CLI will print this command for you when you quit.
