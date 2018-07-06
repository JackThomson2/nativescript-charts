import {
	ILegend,
	LegendHorizontalAlignment,
	LegendVerticalAlignment,
	LegendForm
} from '../components/legend';
import {
	XPosition,
	YPosition,
	Axis,
	IXAxis,
	ILeftYAxis,
	IRightYAxis
} from '../components/axes';
import { BaseChartSettings } from '../components/chart';
import { Dataset } from '../components/dataset';
import { View, Property } from 'tns-core-modules/ui/core/view';

export {
	ILegend,
	LegendHorizontalAlignment,
	LegendVerticalAlignment,
	LegendForm
};
export { XPosition, YPosition, Axis, IXAxis, ILeftYAxis, IRightYAxis };

declare const android, com, java, org: any;

export interface ILineChart {
	Legend?: ILegend;
	XAxis?: IXAxis;
	LeftYAxis?: ILeftYAxis;
	RightYAxis?: IRightYAxis;
	BaseSettings?: BaseChartSettings;
}

export interface IPoint {
	x: number;
	y: number;
}

export interface ILineSeries extends Dataset {
	color?: string | number;
	lineData: Array<IPoint>;
	name: string;
	highLightColor?: string | number;
	drawHighlightIndicators?: boolean;
	highlightLineWidth?: number;
	fillColor?: string | number;
	fillAlpha?: number;
	drawFilled?: boolean;
	lineWidth?: number;
	circleRadius?: number;
	circleColor?: string | number;
	circleColorHole?: string | number;
	drawCircleHole?: boolean;
	enableDashedLine?: {
		lineLength: number;
		spaceLength: number;
		phase: number;
	};
}

export const chartSettingsProperty = new Property<LineChartCommon, ILineChart>({
	name: 'chartSettings'
});

export const chartDataProperty = new Property<
	LineChartCommon,
	Array<ILineSeries>
>({
	name: 'chartData'
});

export abstract class LineChartCommon extends View {
	public _graph: any;
	public _context: any;

	public chartData: Array<ILineSeries> = undefined;
	public chartSettings: ILineChart = undefined;

	protected LineDataSet = undefined;
	protected LineData = undefined;
	protected Entry = undefined;
	protected ArrayList = undefined;
	protected Legend = undefined;
	protected YAxisPosition = undefined;
	protected XAxisPosition = undefined;

	protected abstract getGraphData(): any;
	protected abstract setChart(): any;
	protected abstract onNewData(): any;

	[chartSettingsProperty.setNative](value: ILineChart) {
		this.chartSettings = value;
		this.setChart();
	}

	[chartDataProperty.setNative](value: Array<ILineSeries>) {
		this.chartData = value;
		this.onNewData();
	}

	constructor(protected lineChartArgs: ILineChart) {
		super();
	}
}

chartSettingsProperty.register(LineChartCommon);
chartDataProperty.register(LineChartCommon);
