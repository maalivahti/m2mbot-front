import { ObjectPage } from 'pages/ObjectsPage';
import { StatisticsPage } from 'pages/StatisticsPage';
import { ReqsTOPage } from 'pages/ReqsToPage';
import { ReqsTpPage } from 'pages/ReqsTpPage';
import { FinancesPage } from 'pages/FinancesPage';
import { ClientDispatchPage } from 'pages/ClientDispatchPage';
import { LCManagerPage } from 'pages/LCManagerPage';
import { HRModulePage } from 'pages/HRModulePage';
import { SalaryTablePage } from 'pages/SalaryTablePage';
import { SalaryPersPage } from 'pages/SalaryPersPage';
import { SalaryAccrualListPage } from 'pages/SalaryAccrualListPage';
import { SalaryAgreementPage } from 'pages/SalaryAgreementPage';
import { SupportDispatchPage } from 'pages/SupportDispatchPage';
import { SupportUsersPage } from 'pages/SupportUsersPage';
import { SupportCompanyPage } from 'pages/SupportCompanyPage';
import { SupportNotifyPage } from 'pages/SupportNotifyPage';
import { CustomReportsPage } from 'pages/CustomReportsPage';
import { TravelsPage } from 'pages/TravelsPage';
import { TravelsStatPage } from 'pages/TravelsStatPage';
import { TransactionsPage } from 'pages/TransactionsPage';
import { TransactionsStatPage } from 'pages/TransactionsStatPage';
import { DiagnosticsPage } from 'pages/DiagnosticsPage';
import { FuelDownsPage } from 'pages/FuelDownsPage';

const routes = [
  { name: 'statistics', path: '/', component: StatisticsPage },
  { name: 'objects', path: '/objects', component: ObjectPage },
  { name: 'reqsTO', path: '/reqsTO', component: ReqsTOPage },
  { name: 'reqsTP', path: '/reqsTP', component: ReqsTpPage },
  { name: 'finances', path: '/finances', component: FinancesPage },
  { name: 'client_dispatch', path: '/client_dispatch', component: ClientDispatchPage },
  { name: 'lc_manager', path: '/lc_manager', component: LCManagerPage },
  { name: 'hr_module', path: '/hr_module', component: HRModulePage },
  { name: 'salary_table', path: '/salary_table', component: SalaryTablePage },
  { name: 'salary_pers', path: '/salary_pers', component: SalaryPersPage },
  { name: 'salary_accrual_list', path: '/salary_accrual_list', component: SalaryAccrualListPage },
  { name: 'salary_agreement', path: '/salary_agreement', component: SalaryAgreementPage },
  { name: 'support_dispatch', path: '/support_dispatch', component: SupportDispatchPage },
  { name: 'support_users', path: '/support_users', component: SupportUsersPage },
  { name: 'support_comp', path: '/support_comp', component: SupportCompanyPage },
  { name: 'support_notify', path: '/support_notify', component: SupportNotifyPage },
  { name: 'custom_reports', path: '/custom_reports', component: CustomReportsPage },
  { name: 'travels', path: '/travels', component: TravelsPage },
  { name: 'travels_stats', path: '/travels_stats', component: TravelsStatPage },
  { name: 'transactions', path: '/transactions', component: TransactionsPage },
  { name: 'transactions_stats', path: '/transactions_stats', component: TransactionsStatPage },
  { name: 'diagnostics', path: '/diagnostics', component: DiagnosticsPage },
  { name: 'fuel_downs', path: '/fuel_downs', component: FuelDownsPage },
];

export default routes;
