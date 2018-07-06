import {
	ILineSeries,
	IPoint,
	LegendForm,
	LegendHorizontalAlignment,
	LegendVerticalAlignment,
	ILineChart,
	XPosition,
	YPosition,
	Axis,
	IRightYAxis,
	ILeftYAxis,
	LineChartCommon
} from './line-chart.common';
export {
	ILineSeries,
	IPoint,
	LegendForm,
	LegendHorizontalAlignment,
	LegendVerticalAlignment,
	ILineChart,
	XPosition,
	YPosition,
	Axis,
	IRightYAxis,
	ILeftYAxis
};

import { resolveColor } from '../helper';

declare class LineChartView extends NSObject {}

declare class LineChartDataSet extends NSObject {}
declare class LineChartData extends NSObject {}
declare class ChartDataEntry extends NSObject {}
declare class NSMutableArray extends NSObject {}
declare class ChartLegend extends NSObject {}
declare class XAxisLabelPosition extends NSObject {}
declare class YAxisLabelPosition extends NSObject {}

//var Form=com.github.mikephil.charting.components.Legend.LegendForm;
export class LineChart extends LineChartCommon {
	constructor(protected lineChartArgs: ILineChart) {
		super(lineChartArgs);

		this.LineDataSet = LineChartDataSet;
		this.LineData = LineChartData;
		this.Entry = ChartDataEntry;
		this.ArrayList = NSMutableArray;
		this.Legend = ChartLegend;
		this.YAxisPosition = XAxisLabelPosition;
		this.XAxisPosition = YAxisLabelPosition;
	}

	public invalidate() {
		//this._graph.invalidate();
	}

	public clear() {
		this._graph.clear();
		this._graph.notifyDataSetChanged();
		this.setChart();
	}

	public clearData() {
		let datum = this.getGraphData();
		if (datum) {
			datum.clearValues();
			this._graph.notifyDataSetChanged();
			this.invalidate();
		}
	}

	public setChartSettings(lineChartArgs: ILineChart) {
		this.chartSettings = lineChartArgs;
		this.setChart();
		this._graph.notifyDataSetChanged();
		this.invalidate();
	}

	protected onNewData() {
		this._graph.clear();
		if (typeof this.chartData == 'undefined') return;

		var lineDatas = new this.LineData();
		this.chartData.forEach((lineData: ILineSeries) => {
			var entries = new this.ArrayList();
			lineData.lineData.forEach((point: IPoint) => {
				entries.addObject(new this.Entry(point.x, point.y));
			});
			var dataset = new this.LineDataSet(entries, lineData.name);
			this.setDataset(dataset, lineData);
			lineDatas.addDataSet(dataset);
		});

		this._graph.data = lineDatas;
		this._graph.notifyDataSetChanged();
		this.invalidate();
	}

	protected getGraphData() {
		return this._graph.data;
	}

	public createNativeView(): Object {
		this._graph = new LineChartView();
		return this._graph;
	}

	public _createUI() {
		this.setChart();
	}

	protected setDataset(dataset, lineData) {
		dataset.setColor(resolveColor(lineData.color));
		if ('valueTextColor' in lineData) {
			//dataset.setValueTextColor(resolveColor(lineData.valueTextColor));
		}
		if ('valueTextColors' in lineData) {
			var colors = new this.ArrayList();
			lineData.valueTextColors.forEach(item => {
				colors.addObject(resolveColor(item));
			});
			//dataset.setValueTextColors(colors);
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
			//if (typeof lineData.highlightEnabled == 'boolean')
			//	dataset.setHighlightEnabled(lineData.highlightEnabled);
		}
		if ('drawVerticalHighlightIndicator' in lineData) {
			if (typeof lineData.drawVerticalHighlightIndicator == 'boolean')
				dataset.drawVerticalHighlightIndicatorEnabled =
					lineData.drawVerticalHighlightIndicator;
		}
		if ('drawHorizontalHighlightIndicator' in lineData) {
			if (typeof lineData.drawHorizontalHighlightIndicator == 'boolean')
				dataset.drawHorizontalHighlightIndicatorEnabled =
					lineData.drawHorizontalHighlightIndicator;
		}
		if ('highLightColor' in lineData) {
			dataset.highlightColor = resolveColor(lineData.highLightColor);
		}
		if ('drawHighlightIndicators' in lineData) {
			//if (typeof lineData.drawHighlightIndicators == 'boolean')
			//	dataset.setDrawHighlightIndicators(lineData.drawHighlightIndicators);
		}
		if ('highlightLineWidth' in lineData) {
			if (lineData.highlightLineWidth > 0)
				dataset.highlightLineWidth = lineData.highlightLineWidth;
		}
		if ('fillColor' in lineData) {
			dataset.fillColor = resolveColor(lineData.fillColor);
		}
		if ('fillAlpha' in lineData) {
			if (lineData.fillAlpha <= 255 && lineData.fillAlpha >= 0) {
				dataset.fillAlpha = lineData.fillAlpha;
			}
		}
		if ('drawFilled' in lineData) {
			if (typeof lineData.drawFilled == 'boolean')
				dataset.fillFormatter = lineData.drawFilled;
		}
		if ('lineWidth' in lineData) {
			if (lineData.lineWidth > 0) dataset.lineWidth = lineData.lineWidth;
		}
		if ('circleRadius' in lineData) {
			if (lineData.circleRadius > 0)
				dataset.circleRadius = lineData.circleRadius;
		}
		if ('circleColor' in lineData) {
			dataset.setCircleColor(resolveColor(lineData.circleColor));
		}
		if ('circleColorHole' in lineData) {
			dataset.setCircleColorHole(resolveColor(lineData.circleColorHole));
		}
		if ('drawCircleHole' in lineData) {
			if (typeof lineData.drawCircleHole == 'boolean')
				dataset.drawCircleHole = lineData.drawCircleHole;
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

	protected setChart() {
		if (typeof this.chartSettings == 'undefined') {
			return;
		}
		if ('BaseSettings' in this.chartSettings) {
			let chart = this._graph;
			let baseSettings = this.chartSettings.BaseSettings;
			if ('backgroundColor' in baseSettings) {
				chart.setBackgroundColor(resolveColor(baseSettings.backgroundColor));
			}
			if ('enabledDescription' in baseSettings) {
				if (typeof baseSettings.enabledDescription == 'boolean') {
				}
				//chart.chartDescription.setEnabled(baseSettings.enabledDescription);
			}
			if ('description' in baseSettings) {
				if (typeof baseSettings.description == 'string')
					chart.getDescription.text = baseSettings.description;
			}
			if ('descriptionColor' in baseSettings) {
				//chart.getDescription.setTextColor(baseSettings.descriptionColor);
			}
			if ('descriptionPosition' in baseSettings) {
				if (
					typeof baseSettings.descriptionPosition.x != 'undefined' &&
					baseSettings.descriptionPosition.x > 0 &&
					typeof baseSettings.descriptionPosition.y != 'undefined' &&
					baseSettings.descriptionPosition.y > 0
				)
					chart.getDescription.position = (baseSettings.descriptionPosition.x,
					baseSettings.descriptionPosition.y);
			}
			if ('descriptionTextSize' in baseSettings) {
				if (baseSettings.descriptionTextSize > 0) {
				}
				//chart.getDescription.setTextSize(baseSettings.descriptionTextSize);
			}
			if ('noDataText' in baseSettings) {
				if (typeof baseSettings.noDataText == 'string')
					chart.noDataText = baseSettings.noDataText;
			}
			if ('drawGridBackground' in baseSettings) {
				if (typeof baseSettings.drawGridBackground == 'boolean')
					chart.drawGridBackgroundEnabled = baseSettings.drawGridBackground;
			}
			if ('gridBackgroundColor' in baseSettings) {
				chart.gridBackgroundColor = resolveColor(
					baseSettings.gridBackgroundColor
				);
			}
			if ('drawBorders' in baseSettings) {
				if (typeof baseSettings.drawBorders == 'boolean')
					chart.drawBordersEnabled = baseSettings.drawBorders;
			}
			if ('borderColor' in baseSettings) {
				chart.borderColor = resolveColor(baseSettings.borderColor);
			}
			if ('borderWidth' in baseSettings) {
				if (baseSettings.borderWidth > 0)
					chart.borderLineWidth = baseSettings.borderWidth;
			}
			if ('maxVisibleValueCount' in baseSettings) {
				if (baseSettings.maxVisibleValueCount > 0)
					chart.maxVisibleCount = baseSettings.maxVisibleValueCount;
			}
		}
		if ('Legend' in this.chartSettings) {
			let legend = this._graph.legend;
			let legendArgs = this.chartSettings.Legend;
			if ('enabled' in legendArgs) {
				if (typeof legendArgs.enabled == 'boolean')
					legend.enabled = legendArgs.enabled;
			}
			if ('textColor' in legendArgs) {
				legend.textColor = resolveColor(legendArgs.textColor);
			}
			if ('wordWrap' in legendArgs) {
				if (typeof legendArgs.wordWrap == 'boolean')
					legend.wordWrapEnabled = legendArgs.wordWrap;
			}
			if ('maxSize' in legendArgs) {
				if (legendArgs.maxSize > 0) legend.maxSizePercent = legendArgs.maxSize;
			}
			if ('form' in legendArgs) {
				legend.form = legendArgs.form;
			}
		}
		if ('XAxis' in this.chartSettings) {
			let xAxisArgs = this.chartSettings.XAxis;
			let XAxis = this._graph.xAxis;
			if ('enabled' in xAxisArgs) {
				if (typeof xAxisArgs.enabled == 'boolean')
					XAxis.enabled = xAxisArgs.enabled;
			}
			if ('drawLabels' in xAxisArgs) {
				if (typeof xAxisArgs.drawLabels == 'boolean')
					XAxis.drawLabelsEnabled = xAxisArgs.drawLabels;
			}
			if ('drawAxisLine' in xAxisArgs) {
				if (typeof xAxisArgs.drawAxisLine == 'boolean')
					XAxis.drawAxisLineEnabled = xAxisArgs.drawAxisLine;
			}
			if ('drawGridLines' in xAxisArgs) {
				if (typeof xAxisArgs.drawGridLines == 'boolean')
					XAxis.drawGridLinesEnabled = xAxisArgs.drawGridLines;
			}
			if ('axisMaximum' in xAxisArgs) {
				if (typeof xAxisArgs.axisMaximum == 'boolean')
					XAxis.axisMaximum = xAxisArgs.axisMaximum;
			}
			if ('axisMinimum' in xAxisArgs) {
				if (typeof xAxisArgs.axisMinimum == 'boolean')
					XAxis.axisMinimum = xAxisArgs.axisMinimum;
			}
			if ('inverted' in xAxisArgs) {
				if (typeof xAxisArgs.inverted == 'boolean') {
				}
				//XAxis.setInverted(xAxisArgs.inverted);
			}
			/*if('spaceTop' in xAxisArgs){
                if(xAxisArgs.spaceTop <= 100 && xAxisArgs.spaceTop >= 0) XAxis.setSpaceTop(xAxisArgs.spaceTop);
            }
            if('spaceBottom' in xAxisArgs){
                if(xAxisArgs.spaceBottom <= 100 && xAxisArgs.spaceBottom >= 0) XAxis.setSpaceBottom(xAxisArgs.spaceBottom);
            }*/
			if ('showOnlyMinMax' in xAxisArgs) {
				if (typeof xAxisArgs.inverted == 'boolean') {
				}
				//XAxis.setShowOnlyMinMax(xAxisArgs.showOnlyMinMax);
			}
			if ('labelCount' in xAxisArgs) {
				if (
					xAxisArgs.labelCount.count > 0 &&
					typeof xAxisArgs.labelCount.count != 'undefined' &&
					typeof xAxisArgs.labelCount.force == 'boolean'
				)
					XAxis.setLabelCount(
						xAxisArgs.labelCount.count,
						xAxisArgs.labelCount.force
					);
			}
			if ('granularity' in xAxisArgs) {
				if (xAxisArgs.granularity > 0)
					XAxis.granularity = xAxisArgs.granularity;
			}
			if ('granularityEnabled' in xAxisArgs) {
				if (typeof xAxisArgs.granularityEnabled == 'boolean')
					XAxis.granularityEnabled = xAxisArgs.granularityEnabled;
			}
			if ('textColor' in xAxisArgs) {
				XAxis.labelTextColor = resolveColor(xAxisArgs.textColor);
			}
			if ('textSize' in xAxisArgs) {
				//if (xAxisArgs.textSize > 0) XAxis.setTextSize(xAxisArgs.textSize);
			}
			if ('gridColor' in xAxisArgs) {
				XAxis.gridColor = resolveColor(xAxisArgs.gridColor);
			}
			if ('gridLineWidth' in xAxisArgs) {
				if (xAxisArgs.textSize > 0)
					XAxis.gridLineWidth = xAxisArgs.gridLineWidth;
			}
			if ('enableGridDashedLine' in xAxisArgs) {
				if (
					xAxisArgs.enableGridDashedLine.lineLength > 0 &&
					xAxisArgs.enableGridDashedLine.spaceLength > 0 &&
					xAxisArgs.enableGridDashedLine.phase > 0
				)
					XAxis.gridLineWidth = xAxisArgs.enableGridDashedLine.lineLength;
				XAxis.gridLineDashPhase = xAxisArgs.enableGridDashedLine.phase;
			}
			if ('position' in xAxisArgs) {
				XAxis.LabelPosition = xAxisArgs.position;
			}
			if ('labelRotationAngle' in xAxisArgs) {
				XAxis.labelRotationAngle = xAxisArgs.labelRotationAngle;
			}
		}
		if ('RightYAxis' in this.chartSettings) {
			let yAxisArgs = this.chartSettings.RightYAxis;
			let YAxis = this._graph.rightAxis;
			this.setYAxis(yAxisArgs, YAxis);
		}
		if ('LeftYAxis' in this.chartSettings) {
			let yAxisArgs = this.chartSettings.LeftYAxis;
			let YAxis = this._graph.leftAxis;
			this.setYAxis(yAxisArgs, YAxis);
		}

		this._graph.notifyDataSetChanged();
		this.invalidate();
	}

	private setYAxis(yAxisArgs, YAxis) {
		if ('enabled' in yAxisArgs) {
			if (typeof yAxisArgs.enabled == 'boolean')
				YAxis.enabled = yAxisArgs.enabled;
		}
		if ('drawLabels' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.drawLabelsEnabled = yAxisArgs.drawLabels;
		}
		if ('drawAxisLine' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.drawAxisLineEnabled = yAxisArgs.drawAxisLine;
		}
		if ('drawGridLines' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.drawGridLinesEnabled = yAxisArgs.drawGridLines;
		}
		if ('axisMaximum' in yAxisArgs) {
			YAxis.axisMaximum = yAxisArgs.axisMaximum;
		}
		if ('axisMinimum' in yAxisArgs) {
			YAxis.axisMinimum = yAxisArgs.axisMinimum;
		}
		if ('inverted' in yAxisArgs) {
			//if (typeof yAxisArgs.drawLabels == 'boolean')
			//	YAxis.setInverted(yAxisArgs.inverted);
		}
		if ('spaceTop' in yAxisArgs) {
			if (yAxisArgs.spaceTop <= 100 && yAxisArgs.spaceTop >= 0)
				YAxis.spaceTop = yAxisArgs.spaceTop;
		}
		if ('spaceBottom' in yAxisArgs) {
			if (yAxisArgs.spaceBottom <= 100 && yAxisArgs.spaceBottom >= 0)
				YAxis.spaceBottom = yAxisArgs.spaceBottom;
		}
		if ('showOnlyMinMax' in yAxisArgs) {
			//if (typeof yAxisArgs.drawLabels == 'boolean')
			//	YAxis.setShowOnlyMinMax(yAxisArgs.showOnlyMinMax);
		}
		if ('labelCount' in yAxisArgs) {
			if (
				yAxisArgs.labelCount.count &&
				yAxisArgs.labelCount.count > 0 &&
				typeof yAxisArgs.labelCount.force == 'boolean'
			)
				YAxis.setLabelCount(
					yAxisArgs.labelCount.count,
					yAxisArgs.labelCount.force
				);
		}
		if ('granularity' in yAxisArgs) {
			if (yAxisArgs.granularity > 0) YAxis.granularity = yAxisArgs.granularity;
		}
		if ('granularityEnabled' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.granularityEnabled = yAxisArgs.granularityEnabled;
		}
		if ('textColor' in yAxisArgs) {
			YAxis.labelTextColor = resolveColor(yAxisArgs.textColor);
		}
		if ('textSize' in yAxisArgs) {
			//if (yAxisArgs.textSize > 0) YAxis.setTextSize(yAxisArgs.textSize);
		}
		if ('gridColor' in yAxisArgs) {
			YAxis.gridColor = resolveColor(yAxisArgs.gridColor);
		}
		if ('gridLineWidth' in yAxisArgs) {
			if (yAxisArgs.gridLineWidth > 0)
				YAxis.gridLineWidth = yAxisArgs.gridLineWidth;
		}
		if ('enableGridDashedLine' in yAxisArgs) {
			if (
				yAxisArgs.enableGridDashedLine.lineLength > 0 &&
				yAxisArgs.enableGridDashedLine.spaceLength > 0 &&
				yAxisArgs.enableGridDashedLine.phase > 0
			)
				YAxis.gridLineWidth = yAxisArgs.enableGridDashedLine.lineLength;
			YAxis.gridLineDashPhase = yAxisArgs.enableGridDashedLine.phase;
		}
		if ('position' in yAxisArgs) {
			YAxis.LabelPosition = this.YAxisPosition.valueOf(yAxisArgs.position);
		}
		if ('drawZeroLine' in yAxisArgs) {
			if (typeof yAxisArgs.drawZeroLine == 'boolean')
				YAxis.drawZeroLineEnabled = yAxisArgs.drawZeroLine;
		}
		if ('zeroLineWidth' in yAxisArgs) {
			if (yAxisArgs.zeroLineWidth > 0)
				YAxis.zeroLineWidth = yAxisArgs.zeroLineWidth;
		}
		if ('zeroLineColor' in yAxisArgs) {
			YAxis.zeroLineColor = resolveColor(yAxisArgs.zeroLineColor);
		}
	}

	public getXAxis() {
		return this._graph.getXAxis();
	}
	public getRightYAxis() {
		return this._graph.getAxisRight();
	}
	public getLeftYAxis() {
		return this._graph.getAxisLeft();
	}
}
