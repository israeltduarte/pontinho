export class Player {
  constructor(
    public id: string,
    public name: string,
    public total: number,
    public scape: any,
    public points: any[],
    public hasExploded: boolean,
    public hasExplodedWith: number,
    public isBackWith: number,
    public isPlaying: boolean
  ) {}
}
