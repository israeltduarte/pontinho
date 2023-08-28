export class Player {
  constructor(
    public id: string,
    public name: string,
    public total: number,
    public scape: number,
    public points: number[],
    public hasExploded: boolean,
    public hasExplodedWith: number,
    public isBackWith: number,
    public isPlaying: boolean
  ) {}
}
