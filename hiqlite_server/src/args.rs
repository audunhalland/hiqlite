use clap::{Parser, ValueEnum};

#[derive(Debug, Clone, Parser)]
#[clap(author, version, about)]
pub enum Args {
    /// Start a Hiqlite server
    Serve(ArgsConfig),

    /// Generate a new default config with safe values for testing
    GenerateConfig,
}

#[derive(Debug, Clone, Parser)]
pub struct ArgsConfig {
    /// If you provide the node_id here, it will overwrite the value from the config file
    #[clap(long)]
    pub node_id: Option<u64>,

    /// The optional config file name to parse
    #[clap(short, long, default_value = "$HOME/.hiqlite/config")]
    pub config_file: String,

    /// Enable SQL statement logging
    #[clap(long)]
    pub log_statements: Option<bool>,

    /// Enable SQL statement logging
    #[clap(short, long, default_value = "info")]
    pub log_level: LogLevel,
}

#[derive(Debug, Clone, ValueEnum)]
pub enum LogLevel {
    Info,
    Warn,
    Error,
}

impl LogLevel {
    pub fn as_str(&self) -> &str {
        match self {
            LogLevel::Info => "info",
            LogLevel::Warn => "warn",
            LogLevel::Error => "error",
        }
    }
}
