MIX_ENV=prod mix compile.protocols
MIX_ENV=prod PORT=4001 elixir -pa _build/prod/consolidated -S mix phoenix.server
