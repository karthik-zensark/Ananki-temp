export class AccessType {
  select: string;
  read: string;
  write: string;
  readandwrite: string;

  constructor(select: string, read: string, write: string, readandwrite: string) {
    this.select = select;
    this.read = read;
    this.write = write;
    this.readandwrite = readandwrite;
  }
}
