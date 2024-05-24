export class ResizeUtils {


  static setNewModalHeight(
    resizeSpeed: number,
    currentHeight: number,
    maxHeight: number,
    minHeight: number,
    isMouseMovingUp: boolean
  ): number {
    if (isMouseMovingUp) {
      return this.decreaseHeight(currentHeight, resizeSpeed, minHeight);
    } else {
      return this.increaseHeight(currentHeight, resizeSpeed, maxHeight);
    }
  }

  private static decreaseHeight(currentHeight: number, resizeSpeed: number, minHeight: number): number {
    if (!this.isExceedingMinHeight(currentHeight, resizeSpeed, minHeight)) {
      return currentHeight - resizeSpeed;
    }
    return currentHeight;
  }

  private static increaseHeight(currentHeight: number, resizeSpeed: number, maxHeight: number): number {
    if (!this.isExceedingMaxHeight(currentHeight, resizeSpeed, maxHeight)) {
      return currentHeight + resizeSpeed;
    }
    return currentHeight;
  }

  private static isExceedingMaxHeight(currentHeight: number, resizeSpeed: number, maxHeight: number): boolean {
    return currentHeight + resizeSpeed > maxHeight;
  }

  private static isExceedingMinHeight(currentHeight: number, resizeSpeed: number, minHeight: number): boolean {
    return currentHeight - resizeSpeed < minHeight;
  }


}
