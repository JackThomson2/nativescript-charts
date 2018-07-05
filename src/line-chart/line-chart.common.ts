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
	XAxis,
	LeftYAxis,
	RightYAxis
} from '../components/axes';
import { BaseChartSettings } from '../components/chart';
import { Dataset } from '../components/dataset';
import { resolveColor } from '../helper';
import { View, Property } from 'tns-core-modules/ui/core/view';

declare const java: any;

export {
	ILegend,
	LegendHorizontalAlignment,
	LegendVerticalAlignment,
	LegendForm
};
export { XPosition, YPosition, Axis, XAxis, LeftYAxis, RightYAxis };

export interface ILineChart {
	Legend?: ILegend;
	XAxis?: XAxis;
	LeftYAxis?: LeftYAxis;
	RightYAxis?: RightYAxis;
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

var ArrayList = java.util.ArrayList;

export abstract class LineChartCommon extends View {
	protected config: any = {};

	public chartData: Array<ILineSeries> = undefined;
	public chartSettings: ILineChart = undefined;

	[chartSettingsProperty.setNative](value: ILineChart) {
		console.log('Settings set');
		this.chartSettings = value;
		this.setChart();
	}

	[chartDataProperty.setNative](value: Array<ILineSeries>) {
		console.log('Data set');
		this.chartData = value;
		this.onNewData();
	}

	constructor(protected lineChartArgs: ILineChart) {
		super();
	}

	protected abstract onNewData(): void;
	protected abstract setChart(): void;

	protected resolveColor(color) {
		return resolveColor(color);
	}

	protected setDataset(dataset, lineData) {
		dataset.setColor(resolveColor(lineData.color));
		if ('valueTextColor' in lineData) {
			dataset.setValueTextColor(resolveColor(lineData.valueTextColor));
		}
		if ('valueTextColors' in lineData) {
			var colors = new ArrayList();
			lineData.valueTextColors.forEach(item => {
				colors.add(new java.lang.Integer(resolveColor(item)));
			});
			dataset.setValueTextColors(colors);
			colors = null;
		}
		if ('valueTextSize' in lineData) {
			if (lineData.valueTextSize > 0)
				dataset.setValueTextSize(lineData.valueTextSize);
		}
		if ('drawValues' in lineData) {
			if (typeof lineData.drawValues == 'boolean')
				dataset.setDrawValues(lineData.drawValues);
		}
		if ('highlightEnabled' in lineData) {
			if (typeof lineData.highlightEnabled == 'boolean')
				dataset.setHighlightEnabled(lineData.highlightEnabled);
		}
		if ('drawVerticalHighlightIndicator' in lineData) {
			if (typeof lineData.drawVerticalHighlightIndicator == 'boolean')
				dataset.setDrawVerticalHighlightIndicator(
					lineData.drawVerticalHighlightIndicator
				);
		}
		if ('drawHorizontalHighlightIndicator' in lineData) {
			if (typeof lineData.drawHorizontalHighlightIndicator == 'boolean')
				dataset.setDrawHorizontalHighlightIndicator(
					lineData.drawHorizontalHighlightIndicator
				);
		}
		if ('highLightColor' in lineData) {
			dataset.setHighLightColor(resolveColor(lineData.highLightColor));
		}
		if ('drawHighlightIndicators' in lineData) {
			if (typeof lineData.drawHighlightIndicators == 'boolean')
				dataset.setDrawHighlightIndicators(lineData.drawHighlightIndicators);
		}
		if ('highlightLineWidth' in lineData) {
			if (lineData.highlightLineWidth > 0)
				dataset.setHighlightLineWidth(lineData.highlightLineWidth);
		}
		if ('fillColor' in lineData) {
			dataset.setFillColor(resolveColor(lineData.fillColor));
		}
		if ('fillAlpha' in lineData) {
			if (lineData.fillAlpha <= 255 && lineData.fillAlpha >= 0) {
				dataset.setFillAlpha(lineData.fillAlpha);
			}
		}
		if ('drawFilled' in lineData) {
			if (typeof lineData.drawFilled == 'boolean')
				dataset.setDrawFilled(lineData.drawFilled);
		}
		if ('lineWidth' in lineData) {
			if (lineData.lineWidth > 0) dataset.setLineWidth(lineData.lineWidth);
		}
		if ('circleRadius' in lineData) {
			if (lineData.circleRadius > 0)
				dataset.setCircleRadius(lineData.circleRadius);
		}
		if ('circleColor' in lineData) {
			dataset.setCircleColor(resolveColor(lineData.circleColor));
		}
		if ('circleColorHole' in lineData) {
			dataset.setCircleColorHole(resolveColor(lineData.circleColorHole));
		}
		if ('drawCircleHole' in lineData) {
			if (typeof lineData.drawCircleHole == 'boolean')
				dataset.setDrawCircleHole(lineData.drawCircleHole);
		}
		if ('enableDashedLine' in lineData) {
			if (
				lineData.enableDashedLine.lineLength > 0 &&
				lineData.enableDashedLine.spaceLength > 0 &&
				lineData.enableDashedLine.phase > 0
			)
				dataset.enableDashedLine(
					lineData.enableDashedLine.lineLength,
					lineData.enableDashedLine.spaceLength,
					lineData.enableDashedLine.phase
				);
		}
	}
}

chartSettingsProperty.register(LineChartCommon);
chartDataProperty.register(LineChartCommon);
