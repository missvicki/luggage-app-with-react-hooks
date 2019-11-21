export const mockAsync = fn => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};
