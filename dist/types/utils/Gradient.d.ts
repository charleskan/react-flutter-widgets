import type { AlignmentGeometry } from './Alignment';
export interface GradientStop {
    color: string;
    stop?: number;
}
export declare abstract class Gradient {
    colors: string[];
    stops?: number[];
    constructor(options: {
        colors: string[];
        stops?: number[];
    });
    abstract toCSS(): string;
}
export declare class LinearGradient extends Gradient {
    begin: AlignmentGeometry;
    end: AlignmentGeometry;
    tileMode?: 'clamp' | 'repeat' | 'mirror';
    constructor(options: {
        colors: string[];
        stops?: number[];
        begin?: AlignmentGeometry;
        end?: AlignmentGeometry;
        tileMode?: 'clamp' | 'repeat' | 'mirror';
    });
    private alignmentToAngle;
    toCSS(): string;
}
export declare class RadialGradient extends Gradient {
    center: AlignmentGeometry;
    radius: number;
    focal?: AlignmentGeometry;
    focalRadius: number;
    tileMode: 'clamp' | 'repeat' | 'mirror';
    constructor(options: {
        colors: string[];
        stops?: number[];
        center?: AlignmentGeometry;
        radius?: number;
        focal?: AlignmentGeometry;
        focalRadius?: number;
        tileMode?: 'clamp' | 'repeat' | 'mirror';
    });
    private alignmentToPercentage;
    toCSS(): string;
}
export declare class SweepGradient extends Gradient {
    center: AlignmentGeometry;
    startAngle: number;
    endAngle: number;
    tileMode: 'clamp' | 'repeat' | 'mirror';
    constructor(options: {
        colors: string[];
        stops?: number[];
        center?: AlignmentGeometry;
        startAngle?: number;
        endAngle?: number;
        tileMode?: 'clamp' | 'repeat' | 'mirror';
    });
    private alignmentToPercentage;
    toCSS(): string;
}
//# sourceMappingURL=Gradient.d.ts.map