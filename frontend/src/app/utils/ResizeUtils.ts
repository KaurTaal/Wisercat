export class ResizeUtils {


  //TODO Break up this method
  static setNewModalHeight(resizeSpeed: number, currentHeight: number, maxHeight: number, minHeight: number, isMouseMovingUp: boolean): number {
    const isExceedingMax: boolean = currentHeight + resizeSpeed > maxHeight;
    const isExceedingMin: boolean = currentHeight - resizeSpeed < minHeight;
    if (isMouseMovingUp && !isExceedingMin) {
      currentHeight -= resizeSpeed;
    }
    if (!isMouseMovingUp && !isExceedingMax) {
      currentHeight += resizeSpeed;
    }

    return currentHeight;
  }


}
