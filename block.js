export class Block{
    constructor(width, height, x, y) {
        // 벽돌은 넓이, 높이, x, y 값을 가지고 있다
        this.width = width;
        this.height = height;
        this.x=x;
        this.y=y;

        // 공을 추적하기위해 maximum값도 정의해 준다.
        this.maxX=width + x;
        this.maxY=height + y;
        
    }
    draw(ctx){
        // draw함수에 실제로 그려지는 걸 만들어 준다.
        const xGap = 80;
        const yGap = 60;

        ctx.fillStyle = '#ff384e';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        // 디자인을 위한 그림자 생성
        // 그림에서 모든건 다 좌표. 즉 얼마나 이동시킬 것인가를 좌표로 설정.
        // x,y 좌표 설정
        ctx.fillStyle = '#190f3a';
        ctx.beginPath();
        ctx.moveTo(this.maxX, this.maxY);
        ctx.lineTo(this.maxX-xGap, this.maxY+yGap);
        ctx.lineTo(this.x-xGap, this.maxY+yGap);
        ctx.lineTo(this.x, this.maxY);
        ctx.fill();

        // 옆부분 그림자
        ctx.fillStyle = '#9d0919';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.maxY);
        ctx.lineTo(this.x-xGap, this.maxY+yGap);
        ctx.lineTo(this.x-xGap, this.maxY+yGap-this.height);
        ctx.fill();

    }

}