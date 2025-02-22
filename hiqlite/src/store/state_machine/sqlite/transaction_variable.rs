/// A 0-based reference to a transaction statement
#[derive(Clone, Copy)]
pub struct StmtIndex(pub usize);

impl StmtIndex {
    /// Specify a column on the StmtIndex to produce a [StmtColumn].
    pub fn column<C>(self, column: C) -> StmtColumn<C> {
        StmtColumn { stmt_index: self, column }
    }
}

/// A reference to a column produced by a statement in a transaction.
#[derive(Clone, Copy)]
pub struct StmtColumn<C> {
    pub(crate) stmt_index: StmtIndex,
    pub(crate) column: C,
}

impl<C> StmtColumn<C> {
    /// Get the [StmtIndex] that this statement column refers to.
    pub fn stmt_index(&self) -> StmtIndex {
        self.stmt_index
    }

    /// Get the column reference.
    pub fn column(&self) -> &C {
        &self.column
    }
}
