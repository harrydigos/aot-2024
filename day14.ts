type PerfReview<T> = T extends AsyncGenerator<infer Y> ? Y : never;
