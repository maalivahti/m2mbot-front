// import { ref } from 'vue';
import convertDetailDataToTree from '../helpers/convertDetailDataToTree';

export default function detailTreeData(detailData) {
  console.log('detailData: ', detailData);
  const workDetailTree = [
    {
      label: 'Всего подключено:',
      count: detailData.work_items.all_item,
      header: 'head',
    },
    {
      label: 'Исправно:',
      count: detailData.work_items.okay_item,
      header: 'head',
    },
    {
      label: 'С замечаниями:',
      count: detailData.work_items.bad_item,
      header: 'head',
      children: convertDetailDataToTree(detailData.work_items.bad_item_data, 'name_obj', 'res_row'),
    },
    {
      label: 'Не выходят на связь:',
      count: detailData.work_items.not_online,
      header: 'head',
      children: [
        {
          label: 'причина не уточнена:',
          count: detailData.work_items.hz_data.length,
          header: 'child',
          children: convertDetailDataToTree(detailData.work_items.hz_data, 'name_obj'),
        },
        {
          label: 'необходим выезд:',
          count: detailData.work_items.work_bad_data.length,
          header: 'child',
          children: convertDetailDataToTree(detailData.work_items.work_bad_data, 'name_obj'),
        },
        {
          label: 'простой:',
          count: detailData.work_items.stay_b_data.length,
          header: 'child',
          children: convertDetailDataToTree(detailData.work_items.stay_b_data, 'name_obj'),
        },
        {
          label: 'ремонт:',
          count: detailData.work_items.repair_data.length,
          header: 'child',
          children: convertDetailDataToTree(detailData.work_items.repair_data, 'name_obj'),
        },
      ],
    },
  ];
  return { workDetailTree };
}
