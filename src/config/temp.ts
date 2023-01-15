export type video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  like: number;
  dislike: number;
  url: string;
  tags: string[];
  category: string;
  views: number;
  date: Date;
};
const Video: video = {
  id: '654321789',
  title: 'What is Web 3.0? (Explained with Animations)',
  description:
    "In this video, you'll learn about Web 3.0 and how it differences from the past versions of the internet. Cryptocurrencies and decentralization are changing how we interact with the web forever!",
  thumbnailUrl:
    'https://i.ytimg.com/vi/nHhAEkG1y2U/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvciMncLXs77ExKwjm7MOOnUgoLQ',
  like: 1000,
  dislike: 200,
  url: 'https://rr3---sn-p5qlsn76.googlevideo.com/videoplayback?expire=1673621989&ei=hR3BY4eTAZHt2_gPy9aLkA8&ip=198.181.163.229&id=o-AGS7PEYVdAGR7mq_YzCpH4gQE4g3Qr9N6U24HJLB6DSf&itag=398&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&mh=Qa&mm=31%2C26&mn=sn-p5qlsn76%2Csn-vgqsrnl6&ms=au%2Conr&mv=m&mvi=3&pl=24&initcwndbps=1051250&spc=zIddbKOOna5a8HRV7xUKcAC9uMe4dvw&vprv=1&mime=video%2Fmp4&ns=L7zQvJlo6zYjKZEjEZ6iC6AK&gir=yes&clen=6985588&dur=519.000&lmt=1645091737919726&mt=1673600252&fvip=5&keepalive=yes&fexp=24007246&c=WEB&txp=4531432&n=LEqny7jLyTQRwQ&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMO02sbcAJnAZxu5t4-YPxWXDRO9j-zZ-VtizQ-c4dA1AiEA1oQUTJzFcKBk69pRr8JO1-BJNs-TNMFo6ipjttXGK40%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAK8BMS-wROHBi5GzShPiz1AnvqVBP6_MKyLuf4seCvVZAiEAysBCJlHHX832HSsfucgsPXGLsuT2egbnW0MnuqPnhL4%3D',
  tags: ['blackChain', 'web3'],
  category: 'knowledge',
  views: 102356,
  date: new Date(1673407001),
};

export default Video;
