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
	XAxis,
	RightYAxis,
	LeftYAxis,
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
	XAxis,
	RightYAxis,
	LeftYAxis
};
import { resolveColor } from '../helper';
declare const android, com, java, org: any;

var LineDataSet = com.github.mikephil.charting.data.LineDataSet;
var LineData = com.github.mikephil.charting.data.LineData;
var Entry = com.github.mikephil.charting.data.Entry;
var ArrayList = java.util.ArrayList;
var Legend = com.github.mikephil.charting.components.Legend;
var YAxisPosition =
	com.github.mikephil.charting.components.YAxis.YAxisLabelPosition;
var XAxisPosition = com.github.mikephil.charting.components.XAxis.XAxisPosition;

//var Form=com.github.mikephil.charting.components.Legend.LegendForm;
export class LineChart extends LineChartCommon {
	public _graph: any;
	public _context: any;

	public createNativeView(): Object {
		this._graph = new com.github.mikephil.charting.charts.LineChart(
			this._context,
			null
		);
		return this._graph;
	}

	public _createUI() {
		this.setChart();
	}
	public invalidate() {
		this._graph.invalidate();
	}

	public clear() {
		this._graph.clear();
		this._graph.notifyDataSetChanged();
		this.setChart();
	}

	public clearData() {
		if (this._graph.getData()) {
			this._graph.getData().clearValues();
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
		let cntr = 0;
		let graphData = this._graph.getData();
		this.chartData.forEach((lineData: ILineSeries) => {
			var entries = new ArrayList();
			lineData.lineData.forEach((point: IPoint) => {
				entries.add(new Entry(point.x, point.y));
			});
			var dataset = new LineDataSet(entries, lineData.name);
			this.setDataset(dataset, lineData);
			if (cntr == 0) {
				var lineDatasets = new ArrayList();
				lineDatasets.add(dataset);
				var lineDatas = new LineData(lineDatasets);
				this._graph.setData(lineDatas);
				graphData = this._graph.getData();
			} else {
				graphData.addDataSet(dataset);
			}
			cntr++;
		});
		this._graph.notifyDataSetChanged();
		this.invalidate();
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
				if (typeof baseSettings.enabledDescription == 'boolean')
					chart.getDescription().setEnabled(baseSettings.enabledDescription);
			}
			if ('description' in baseSettings) {
				if (typeof baseSettings.description == 'string')
					chart.getDescription().setText(baseSettings.description);
			}
			if ('descriptionColor' in baseSettings) {
				chart.getDescription().setTextColor(baseSettings.descriptionColor);
			}
			if ('descriptionPosition' in baseSettings) {
				if (
					typeof baseSettings.descriptionPosition.x != 'undefined' &&
					baseSettings.descriptionPosition.x > 0 &&
					typeof baseSettings.descriptionPosition.y != 'undefined' &&
					baseSettings.descriptionPosition.y > 0
				)
					chart
						.getDescription()
						.setPosition(
							baseSettings.descriptionPosition.x,
							baseSettings.descriptionPosition.y
						);
			}
			if ('descriptionTextSize' in baseSettings) {
				if (baseSettings.descriptionTextSize > 0)
					chart.getDescription().setTextSize(baseSettings.descriptionTextSize);
			}
			if ('noDataText' in baseSettings) {
				if (typeof baseSettings.noDataText == 'string')
					chart.setNoDataText(baseSettings.noDataText);
			}
			if ('drawGridBackground' in baseSettings) {
				if (typeof baseSettings.drawGridBackground == 'boolean')
					chart.setDrawGridBackground(baseSettings.drawGridBackground);
			}
			if ('gridBackgroundColor' in baseSettings) {
				chart.setGridBackgroundColor(
					resolveColor(baseSettings.gridBackgroundColor)
				);
			}
			if ('drawBorders' in baseSettings) {
				if (typeof baseSettings.drawBorders == 'boolean')
					chart.setDrawBorders(baseSettings.drawBorders);
			}
			if ('borderColor' in baseSettings) {
				chart.setBorderColor(resolveColor(baseSettings.borderColor));
			}
			if ('borderWidth' in baseSettings) {
				if (baseSettings.borderWidth > 0)
					chart.setBorderWidth(baseSettings.borderWidth);
			}
			if ('maxVisibleValueCount' in baseSettings) {
				if (baseSettings.maxVisibleValueCount > 0)
					chart.setMaxVisibleValueCount(baseSettings.maxVisibleValueCount);
			}
		}
		if ('Legend' in this.chartSettings) {
			let legend = this._graph.getLegend();
			let legendArgs = this.chartSettings.Legend;
			if ('enabled' in legendArgs) {
				if (typeof legendArgs.enabled == 'boolean')
					legend.setEnabled(legendArgs.enabled);
			}
			if ('textColor' in legendArgs) {
				legend.setTextColor(resolveColor(legendArgs.textColor));
			}
			if ('wordWrap' in legendArgs) {
				if (typeof legendArgs.wordWrap == 'boolean')
					legend.setWordWrap(legendArgs.wordWrap);
			}
			if ('maxSize' in legendArgs) {
				if (legendArgs.maxSize > 0) legend.setMaxSize(legendArgs.maxSize);
			}
			if ('form' in legendArgs) {
				legend.setForm(Legend.LegendForm.valueOf(legendArgs.form));
			}
		}
		if ('XAxis' in this.chartSettings) {
			let xAxisArgs = this.chartSettings.XAxis;
			let XAxis = this._graph.getXAxis();
			if ('enabled' in xAxisArgs) {
				if (typeof xAxisArgs.enabled == 'boolean')
					XAxis.setEnabled(xAxisArgs.enabled);
			}
			if ('drawLabels' in xAxisArgs) {
				if (typeof xAxisArgs.drawLabels == 'boolean')
					XAxis.setDrawLabels(xAxisArgs.drawLabels);
			}
			if ('drawAxisLine' in xAxisArgs) {
				if (typeof xAxisArgs.drawAxisLine == 'boolean')
					XAxis.setDrawAxisLine(xAxisArgs.drawAxisLine);
			}
			if ('drawGridLines' in xAxisArgs) {
				if (typeof xAxisArgs.drawGridLines == 'boolean')
					XAxis.setDrawGridLines(xAxisArgs.drawGridLines);
			}
			if ('axisMaximum' in xAxisArgs) {
				if (typeof xAxisArgs.axisMaximum == 'boolean')
					XAxis.setAxisMaximum(xAxisArgs.axisMaximum);
			}
			if ('axisMinimum' in xAxisArgs) {
				if (typeof xAxisArgs.axisMinimum == 'boolean')
					XAxis.setAxisMinimum(xAxisArgs.axisMinimum);
			}
			if ('inverted' in xAxisArgs) {
				if (typeof xAxisArgs.inverted == 'boolean')
					XAxis.setInverted(xAxisArgs.inverted);
			}
			/*if('spaceTop' in xAxisArgs){
                if(xAxisArgs.spaceTop <= 100 && xAxisArgs.spaceTop >= 0) XAxis.setSpaceTop(xAxisArgs.spaceTop);
            }
            if('spaceBottom' in xAxisArgs){
                if(xAxisArgs.spaceBottom <= 100 && xAxisArgs.spaceBottom >= 0) XAxis.setSpaceBottom(xAxisArgs.spaceBottom);
            }*/
			if ('showOnlyMinMax' in xAxisArgs) {
				if (typeof xAxisArgs.inverted == 'boolean')
					XAxis.setShowOnlyMinMax(xAxisArgs.showOnlyMinMax);
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
					XAxis.setGranularity(xAxisArgs.granularity);
			}
			if ('granularityEnabled' in xAxisArgs) {
				if (typeof xAxisArgs.granularityEnabled == 'boolean')
					XAxis.setGranularityEnabled(xAxisArgs.granularityEnabled);
			}
			if ('textColor' in xAxisArgs) {
				XAxis.setTextColor(resolveColor(xAxisArgs.textColor));
			}
			if ('textSize' in xAxisArgs) {
				if (xAxisArgs.textSize > 0) XAxis.setTextSize(xAxisArgs.textSize);
			}
			if ('gridColor' in xAxisArgs) {
				XAxis.setGridColor(resolveColor(xAxisArgs.gridColor));
			}
			if ('gridLineWidth' in xAxisArgs) {
				if (xAxisArgs.textSize > 0)
					XAxis.setGridLineWidth(xAxisArgs.gridLineWidth);
			}
			if ('enableGridDashedLine' in xAxisArgs) {
				if (
					xAxisArgs.enableGridDashedLine.lineLength > 0 &&
					xAxisArgs.enableGridDashedLine.spaceLength > 0 &&
					xAxisArgs.enableGridDashedLine.phase > 0
				)
					XAxis.enableGridDashedLine(
						xAxisArgs.enableGridDashedLine.lineLength,
						xAxisArgs.enableGridDashedLine.spaceLength,
						xAxisArgs.enableGridDashedLine.phase
					);
			}
			if ('position' in xAxisArgs) {
				XAxis.setPosition(XAxisPosition.valueOf(xAxisArgs.position));
			}
			if ('labelRotationAngle' in xAxisArgs) {
				XAxis.setLabelRotationAngle(xAxisArgs.labelRotationAngle);
			}
		}
		if ('RightYAxis' in this.chartSettings) {
			let yAxisArgs = this.chartSettings.RightYAxis;
			let YAxis = this._graph.getAxisRight();
			this.setYAxis(yAxisArgs, YAxis);
		}
		if ('LeftYAxis' in this.chartSettings) {
			let yAxisArgs = this.chartSettings.LeftYAxis;
			let YAxis = this._graph.getAxisLeft();
			this.setYAxis(yAxisArgs, YAxis);
		}

		this._graph.notifyDataSetChanged();
		this.invalidate();
	}

	private setYAxis(yAxisArgs, YAxis) {
		if ('enabled' in yAxisArgs) {
			if (typeof yAxisArgs.enabled == 'boolean')
				YAxis.setEnabled(yAxisArgs.enabled);
		}
		if ('drawLabels' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setDrawLabels(yAxisArgs.drawLabels);
		}
		if ('drawAxisLine' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setDrawAxisLine(yAxisArgs.drawAxisLine);
		}
		if ('drawGridLines' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setDrawGridLines(yAxisArgs.drawGridLines);
		}
		if ('axisMaximum' in yAxisArgs) {
			YAxis.setAxisMaximum(yAxisArgs.axisMaximum);
		}
		if ('axisMinimum' in yAxisArgs) {
			YAxis.setAxisMinimum(yAxisArgs.axisMinimum);
		}
		if ('inverted' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setInverted(yAxisArgs.inverted);
		}
		if ('spaceTop' in yAxisArgs) {
			if (yAxisArgs.spaceTop <= 100 && yAxisArgs.spaceTop >= 0)
				YAxis.setSpaceTop(yAxisArgs.spaceTop);
		}
		if ('spaceBottom' in yAxisArgs) {
			if (yAxisArgs.spaceBottom <= 100 && yAxisArgs.spaceBottom >= 0)
				YAxis.setSpaceBottom(yAxisArgs.spaceBottom);
		}
		if ('showOnlyMinMax' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setShowOnlyMinMax(yAxisArgs.showOnlyMinMax);
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
			if (yAxisArgs.granularity > 0)
				YAxis.setGranularity(yAxisArgs.granularity);
		}
		if ('granularityEnabled' in yAxisArgs) {
			if (typeof yAxisArgs.drawLabels == 'boolean')
				YAxis.setGranularityEnabled(yAxisArgs.granularityEnabled);
		}
		if ('textColor' in yAxisArgs) {
			YAxis.setTextColor(resolveColor(yAxisArgs.textColor));
		}
		if ('textSize' in yAxisArgs) {
			if (yAxisArgs.textSize > 0) YAxis.setTextSize(yAxisArgs.textSize);
		}
		if ('gridColor' in yAxisArgs) {
			YAxis.setGridColor(resolveColor(yAxisArgs.gridColor));
		}
		if ('gridLineWidth' in yAxisArgs) {
			if (yAxisArgs.gridLineWidth > 0)
				YAxis.setGridLineWidth(yAxisArgs.gridLineWidth);
		}
		if ('enableGridDashedLine' in yAxisArgs) {
			if (
				yAxisArgs.enableGridDashedLine.lineLength > 0 &&
				yAxisArgs.enableGridDashedLine.spaceLength > 0 &&
				yAxisArgs.enableGridDashedLine.phase > 0
			)
				YAxis.enableGridDashedLine(
					yAxisArgs.enableGridDashedLine.lineLength,
					yAxisArgs.enableGridDashedLine.spaceLength,
					yAxisArgs.enableGridDashedLine.phase
				);
		}
		if ('position' in yAxisArgs) {
			YAxis.setPosition(YAxisPosition.valueOf(yAxisArgs.position));
		}
		if ('drawZeroLine' in yAxisArgs) {
			if (typeof yAxisArgs.drawZeroLine == 'boolean')
				YAxis.setDrawZeroLine(yAxisArgs.drawZeroLine);
		}
		if ('zeroLineWidth' in yAxisArgs) {
			if (yAxisArgs.zeroLineWidth > 0)
				YAxis.setZeroLineWidth(yAxisArgs.zeroLineWidth);
		}
		if ('zeroLineColor' in yAxisArgs) {
			YAxis.setZeroLineColor(resolveColor(yAxisArgs.zeroLineColor));
		}
	}
}
