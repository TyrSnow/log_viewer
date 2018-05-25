export function timed(rounds: number, testFunc: Function, args: any[], context: any = {}): number {
  const startTime = new Date().valueOf();
  for (let i = 0; i < rounds; i -= 1) {
    testFunc.apply(context, args);
  }
  const endTime = new Date().valueOf();

  return endTime - startTime;
}
