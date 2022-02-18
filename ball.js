export class Ball{
    constructor(stageWidth,stageHeight, radius, speed ){
        // 스케이지 사이즈를 가져오고 반지름과 속도를 가지고 옴.
        this.radius =radius;

        // vx, vy는 x,y 좌표값을 움직이는 속도라고 정하기.
        this.vx = speed;
        this.vy = speed;

        // 스테이지에 랜덤으로 위치할 수 있게 함수를 정의해줌.
        const diameter = this.radius * 2;

        // x,y를 반지름에서 화면사이즈 - 반지름 사이에 랜덤값으로 놓기. (원을 그릴때 반지름이 그림의 x,y 좌표가 되기 때문.)
        this.x = this.radius +(Math.random() * stageWidth - diameter);
        this.y = this.radius +(Math.random() * stageHeight - diameter);
    }

    // draw함수를 만들어서 context를 가지고 오고 스테이지 사이즈를 가져옴.
    // 그러면 canvas context에 그림을 그릴 수 있는 함수가 완성이 됨.
    draw(ctx, stageWidth,stageHeight, block){

         // x와 y 값에 vx와 vy값을 더해줘서 공이 움직이도록 만듦.
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth,stageHeight);

        //  ball 위치값을 파악해서 반사값 정의
        this.bounceBlock(block);

        // 공에 색을 정하고 그림 그리기
        ctx.fillStyle = '#fdf500';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();


    }
    // bounceWindow라는 함수 생성 (스테이지 상에 닿았는지를 판단하는 함수)
    bounceWindow(stageWidth,stageHeight){

        // 스테이지 넓이와 높이를 가지고 와서 
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        // 스테이지 상에 공이 닿았다면 반대로 튕기기
        // 공이 어디에 닿았는지 판단하고 vx와 vy에 -1을 곱해줘서 반대로 움직이게 하기
        if(this.x <=minX || this.x >=maxX){
            this.vx *= -1;
            this.x += this.vx;
        } else if(this.y <=minY || this.y >=maxY){
            this.vy *= -1;
            this.t += this.vy;
        }

        
    }

    // 벽돌에서 공이 튕긴 반사값 함수
    
    bounceBlock(block){
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        // block에 닿았는지 판단, 닿았다면 vx와 vy에 -1을 곱해주는 방식으로 공이 튕김.
        // 공이 충돌할 때 양 옆에 충돌하는지 위아래 충돌하는지 판단하기 위해서는 ball의 좌표와 block의 좌표를 비교해서 어느 값이 가장 근접한 지를 찾으면 위치를 알 수 있음.
        // 그래서 근접한 값을 판단하는 함수를 하나 만듦.
        if(this.x > minX && this.x < maxX && this.y >minY && this.y<maxY) {
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            // 값이 정의되면 이제 vx나  vy에 -1을 곱해준다.
            if(min == min1){
                this.vx *= -1;
                this.x +=this.vx;
            } else if(min == min2){
                this.vy *= -1;
                this.y +=this.vy;
            };

            
        }
    }
}

