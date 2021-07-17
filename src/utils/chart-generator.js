import { interpolateInferno } from "d3-scale-chromatic"
class ChartGenerator {
    calculatePoint(i, intervalSize, colorRangeInfo) {
        var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
        return useEndAsStart
            ? colorEnd - i * intervalSize
            : colorStart + i * intervalSize;
    }

    interpolateColors(dataLength, colorRangeInfo) {
        var { colorStart, colorEnd } = colorRangeInfo;
        var colorRange = colorEnd - colorStart;
        var colorInterval = colorRange / dataLength;
        var i, colorPoint;
        var colorArray = [];
        for (i = 0; i < dataLength; i++) {
            colorPoint = this.calculatePoint(i, colorInterval, colorRangeInfo);
            colorArray.push(interpolateInferno(colorPoint));
        }
        return colorArray;
    }

    generateData(dataObj) {
        var i;
        var labels = [];
        var data = [];
        for(i in dataObj){
            labels.push(dataObj[i].nama_kandidat);
            data.push(dataObj[i].total_suara);
        }
        const colorRangeInfo = {
            colorStart: 0.25,
            colorEnd: 0.75,
            useEndAsStart: false,
        };
        const colorArray = this.interpolateColors(data.length, colorRangeInfo);
        const dataset = [{
            data:data,
            backgroundColor: colorArray,
            label:labels
        }]
        return [labels, dataset];
    }
}
export default new ChartGenerator();
