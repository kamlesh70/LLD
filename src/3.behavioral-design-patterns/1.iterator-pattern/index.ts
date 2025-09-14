interface Iterator {
  hasNext(): boolean;
  next(): any;
}

class VideoIterator<T> implements Iterator {
  private currIndex = 0;

  constructor(private readonly list: T[]) {}

  hasNext(): boolean {
    return this.currIndex < this.list.length;
  }

  next() {
    if (this.hasNext()) {
      const item = this.list[this.currIndex];
      ++this.currIndex;
      return item;
    } 

    return null;
  }
}

interface VideoIteratorGenerator<T> {
  getIterator(): Iterator;
}

class VideoPlayer implements VideoIteratorGenerator<string> {
  private playList: string[] = []; // storing the video name or hash only for example

  addVideo(video: string): void {
    this.playList.push(video);
  }

  getIterator(): Iterator {
    return new VideoIterator<string>(this.playList);
  }
}


const videoPlayer = new VideoPlayer();
videoPlayer.addVideo('1');
videoPlayer.addVideo('2');

const iterator = videoPlayer.getIterator();

while (iterator.hasNext()) {
  const str = iterator.next();
  console.log(str)
}