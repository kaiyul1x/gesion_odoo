# -*- coding: utf-8 -*-
# Author: Ray

from odoo import api, models, fields, _
import time
import re


class Project(models.Model):
    _name = "project.project"
    _inherit = ['project.project']
    _inherits = {'gesion.organization': "organization_id"}

    name = fields.Char(related='organization_id.name', inherited=True)
    organization_id = fields.Many2one('gesion.organization', string='Organization',
                                      required=True, ondelete='cascade', auto_join=True)
    # project information
    project_code = fields.Char('Project Code')
    design_manager = fields.Many2one('res.partner', string='Design Manager')
    project_manager = fields.Many2one('res.partner', string='Project Manager')
    craft_package = fields.Char('Craft Package')
    proprietor = fields.Many2one('res.partner', string='Proprietor')
    document_control_users = fields.Many2many('res.users', 'gesion_dms_users_rel', 'pid', 'uid',
                                              string='Document Control Staff')

    # gesion project settings
    # project_currency_conversion_reates = fields.Char(string='Project Currency Conversion Rates')
    # vendor_ids = fields.One2many('res.partner', 'project_id', string="Project Vendor List")

    @api.model
    def create(self, vals):
        project = super(Project, self).create(vals)
        project.organization_id.name = project.name
        project.organization_id.project_id = project
        project.organization_id.organization_type = 'project'
        return project

    @api.multi
    def unlink(self):
        organization = self.organization_id
        res = super(Project, self).unlink()
        organization.unlink()
        return res


class ProjectTask(models.Model):
    _inherit = "project.task"
    _order = 'seq_order'

    user_id = fields.Many2many('res.users', 'user_project_task_ref', 'user_id', 'project_task_id',
                               string='Assigned to',
                               index=True, )

    project_stage_id = fields.Many2one('project.stage', 'Project Stage')
    workpackage_id = fields.Many2one('project.workpackage', 'Workpackage')
    file_ids = fields.One2many('muk_dms.file', 'task_id', string='Files')
    directory_ids = fields.One2many('muk_dms.directory', 'task_id', string='Directory')
    repository_ids = fields.One2many('gesion_dms.repository', 'task_id', string='Repository')
    task_stage_ids = fields.One2many('task.stage', 'task_id', string='Stage')
    # relate muk_dms.file

    file_id = fields.Many2one('muk_dms.file', string='File Name')
    task_number = fields.Char(string='Task Number')
    task_level = fields.Integer(string='Task Level', compute='_compute_task_level', store=True)

    parent_task = fields.Many2one('project.task',
                                  auto_join=True,
                                  ondelete='restrict',
                                  string='Parent Task')

    child_tasks = fields.One2many('project.task',
                                  'parent_task',
                                  copy=False,
                                  string='Subtasks')

    is_root_task = fields.Boolean('Root tasks',
                                  default=False)
    has_child = fields.Boolean(string='Has Child', compute='_compute_has_child', store=True)
    project_construction_area_id = fields.Many2one('project.construction.area',
                                                   string='Project Construction area',
                                                   ondelete='restrict')

    discipline_id = fields.Many2one('project.discipline',
                                    string='Discipline')

    doc_number = fields.Char(string="Document Number", )

    doc_amount = fields.Integer(string='Doc Sheets amount')

    convert_a1 = fields.Float(string='Convert A1')

    designer = fields.Many2one('hr.employee',
                               string='Designer')

    man_hours = fields.Integer(string='Man Hour(h)')



    labor_cost_unit = fields.Float('Labor Cost Unit', )

    currency = fields.Many2one('res.currency', string='Currency')

    labor_cost = fields.Float(string='Labor Cost', )
    # date
    plan_start_date = fields.Date(string='Plan Start Date', )
    forcast_start_date = fields.Date(string='Forcast Start Date', )
    actual_start_date = fields.Date(string='Actual Start Date', )
    plan_end_date = fields.Date(string='Plan End Date', )
    forcast_end_date = fields.Date(string='Forcast End Date', )
    actual_end_date = fields.Date(string='Actual End Date', )
    # earned value
    input_progress = fields.Float(string='Input Progresss', )
    relativity_weight = fields.Float(string='Relativity Weight', )
    absolute_weight = fields.Float(string='Absolute Weight', )
    earned_value = fields.Float(string='Earned Value', )

    early_days = fields.Float(string='Early Days')

    remark = fields.Text(string='Remark')

    grade = fields.Integer(string='QA/QC Grade')

    # stat_rate = fields.Selection([("0", "0星"), ("1", "1星"), ("2", "2星"), ("3", "3星"), ("4", "4星"), ("5", "5星")],
    #                              string='星级评价', default='0')
    stat_rate = fields.Selection([("0", "    "), ("1", "★"), ("2", "★★"), ("3", "★★★"), ("4", "★★★★"), ("5", "★★★★★")],
                                 string='星级评价',default='0')

    task_class_id = fields.Many2one('project.task.class', string='Task Class')
    # sequence = fields.Integer(string='Sequence')
    seq = fields.Char(string='SEQ')

    seq_order = fields.Integer(string='Seq Order')

    #cost related
    Lead_Time_day = fields.Integer(string='Lead Time(d)')
    originator = fields.Many2one('hr.employee')
    buyer = fields.Many2one('hr.employee')
    expediter = fields.Many2one('hr.employee')
    criticality = fields.Char()
    Inspection_level = fields.Char(string='Inspection Level')
    total_float = fields.Integer(string='Total Float')


    #settings
    involved_calculation = fields.Boolean('Is this node involved in calculation?', default=True, compute='_charge_task_child_involved_calculation', store=True)
    child_involved_calculation = fields.Boolean('Is the child node of this node involved in calculation?', default=True, compute='_child_node_display', store=True)
    charge_parent_task_involved_calculation = fields.Boolean(string='charge involved calculation readonly',defualt=True, compute='_charge_task_child_involved_calculation', store=True)
    node_display = fields.Boolean('Is this displayed in tree view?', default=True)
    child_node_display = fields.Boolean('Is the child node of this node displayed in tree view?', default=True)

    calculation_type = fields.Selection([('calculation_current', 'Calculation the relativity Weight by Man Hours'), ('calculation_current_budget', 'Calculation the Relativity Weight by Current Budget')],
                                            default='calculation_current')

    function = fields.Many2one('project.function', string="Fuction(Phase)", translate=True)
    work_code = fields.Many2one('project.workcode', string="Workcode", translate=True)

    Original_Budget = fields.Float(string='Original Budget', default=0.0)
    Budget_Transfer = fields.Float(string='Budget Transfer', default=0.0)
    Approved_Changed = fields.Float(string='Approved Changed', default=0.0)
    Progress_Value = fields.Float(string='Progress Value')
    Actual_Value = fields.Float(string='Actual Value')
    Current_Budget = fields.Float(string='Current Budget', compute='_current_budget_compute', store=True)
    Budget_to_go = fields.Float(string='Budget to go')
    Forecast_to_go = fields.Float(string='Forecast to go')
    Total_forecast = fields.Float(string='Total Forecast')
    Productivity_to_date = fields.Float(string='Productivity to date')
    Productivity_to_go = fields.Float(string='Productivity to go')
    Overall_Productivity = fields.Float(string='Overall Productivity')
    Productivity_in_period = fields.Float(string='Productivity in period')

    @api.depends('parent_task')
    @api.multi
    def _compute_task_level(self):
        for record in self:
            parent = record.parent_task
            hierarchy = 1
            while parent.name:
                hierarchy += 1
                parent = parent.parent_task
            record.task_level = hierarchy

    @api.depends('plan_start_date', 'actual_end_date')
    def _get_human_month(self):

        for record in self:
            if record.plan_start_date > record.actual_end_date:
                record.early_days = 0
            else:
                value = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(
                    time.mktime(time.strptime(record.plan_start_date, "%Y-%m-%d")) - time.mktime(
                        time.strptime(record.actual_end_date, "%Y-%m-%d"))))
                record.early_days = value

    @api.depends('child_tasks')
    @api.multi
    def _compute_has_child(self):
        for record in self:
            record.has_child = True if record.child_tasks else False

    @api.depends('task_level')
    def _choose_root_task(self):
        for record in self:
            if record.task_level <= 1:
                record.is_root_task = True
            else:
                record.is_root_task = False

    @api.constrains('input_progress')
    def _limit_input_progress(self):
        for record in self:
            if not 0 <= record.input_progress <= 1:
                raise ValueError('Input progress must between 0 and 1.')

    @api.constrains('seq')
    def _limit_seq(self):
        for record in self:
            if record.seq:
                reg_seq = re.compile('^\d+(.\d+)*$')
                if not reg_seq.match(record.seq) or not record.seq:
                    raise ValueError(_('Seq input format is incorrect,e.g 1.1.1.1'))

    @api.multi
    def _get_order_seq_id(self):
        versions = self.env['project.task'].search_read(fields=['id', 'seq', 'seq_order'])
        for item in versions:
            if item['seq']:
                item['seq'] = list(map(int, item['seq'].split('.')))
            else:
                item['seq'] = [-1]
        lens = [len(item['seq']) for item in versions]
        max_len = max(lens)
        for item in versions:
            item['seq'] = item['seq'] + [-1] * (max_len - len(item['seq']))
        seq_list_sort = sorted(versions, key=lambda r: r['seq'])
        number = 1
        for item in seq_list_sort:
            item['seq_order'] = number
            number += 1
        return seq_list_sort

    @api.multi
    def _compute_seq_order(self):
        result = []
        res = self._get_order_seq_id()
        for item in res:
            item.pop('seq')
            result.append(item)
        return result

    @api.constrains('task_stage_ids')
    def _limit_stage_move(self):
        for record in self:
            task_stages = list(record.task_stage_ids.mapped(lambda r: r.stage))
            if task_stages and record.stage_id:
                if record.stage_id not in task_stages:
                    raise ValueError(_('Stage is not in Tasks Stage'))

    @api.multi
    def _issued_modify(self):
        task_stages = map(int, self.task_stage_ids.mapped(lambda r: r.stage))
        stage_ids = map(int, self.task_stage_ids.mapped(lambda r: r.id))
        result = zip(task_stages, stage_ids)
        commands = []
        for stage in result:
            if stage[0] == int(self.stage_id):
                vals = {'issued': True}
                commands.append((1, stage[1], vals))
            else:
                vals = {'issued': False}
                commands.append((1, stage[1], vals))
        self.write({'task_stage_ids': commands})

    # Task and file synchronization id
    @api.multi
    def _write_to_file(self):
        file_id = int(self.file_id)
        self.env['muk_dms.file'].search([('id', '=', file_id)]).write({'task_id': int(self.id)})

    @api.multi
    def _delete_file(self):
        self.env['muk_dms.file'].search([('id', '=', int(self.file_id))]).write({'task_id': None})

    @api.multi
    def _change_file(self, last_file):
        file_id = int(self.file_id)
        self.env['muk_dms.file'].search([('id', '=', file_id)]).write({'task_id': None})
        self.env['muk_dms.file'].search([('id', '=', last_file)]).write({'task_id': int(self.id)})

    # involved_calculation modify child_involved_calculation
    @api.onchange('involved_calculation')
    def _child_node_calculation(self):
        for record in self:
            if record.involved_calculation is False:
                record.child_involved_calculation = False

    #  node_display modify child_node_display
    @api.depends('node_display')
    def _child_node_display(self):
        for record in self:
            if record.node_display is False:
                record.child_node_display = False

    @api.depends('Original_Budget', 'Budget_Transfer', 'Approved_Changed')
    def _current_budget_compute(self):
        for record in self:
            if record.Original_Budget and record.Budget_Transfer and record.Approved_Changed:
                record.Current_Budget = record.Original_Budget + record.Budget_Transfer + record.Approved_Changed

    @api.depends('parent_task')
    def _charge_task_child_involved_calculation(self):
        for record in self:
            if record.parent_task:
                if record.parent_task.child_involved_calculation is False:
                    record.involved_calculation = False
                    record.charge_parent_task_involved_calculation = False


    @api.model
    def create(self, vals):
        if 'file_id' in vals and vals['file_id']:
            self.sudo()._write_to_file()
        res = super(ProjectTask, self).create(vals)
        reuslt = self._compute_seq_order()
        update = "UPDATE project_task SET seq_order=%s WHERE id=%s"
        for item in reuslt:
            self._cr.execute(update, (item['seq_order'], item['id']))
        return res

    @api.multi
    def write(self, vals):
        if 'file_id' in vals:
            if vals['file_id']:
                if int(self.file_id) and int(self.file_id) != vals['file_id']:
                    self.sudo()._change_file(vals['file_id'])
                else:
                    self.sudo()._write_to_file()
            else:
                self.sudo()._delete_file()
        res = super(ProjectTask, self).write(vals)
        reuslt = self._compute_seq_order()
        update = "UPDATE project_task SET seq_order=%s WHERE id=%s"
        for item in reuslt:
            self._cr.execute(update, (item['seq_order'], item['id']))
        if 'stage_id' in vals:
            self.sudo()._issued_modify()
        return res


class ProjectTaskClass(models.Model):
    _name = 'project.task.class'

    name = fields.Char(string='name')
    description = fields.Text(string='description')
    task_ids = fields.One2many('project.task', 'task_class_id', string='Project Task')


class Partner(models.Model):
    _inherit = "res.partner"

    project_id = fields.Many2one('project.project', string='Project')


class ProjectFunction(models.Model):
    _name = 'project.function'

    name = fields.Char()
    code = fields.Char()
    description = fields.Text()
    project_id = fields.Many2one('project.project', string='Project')


class ProjectWorkCode(models.Model):
    _name = 'project.workcode'

    name = fields.Char()
    code = fields.Char()
    description = fields.Text()
    project_id = fields.Many2one('project.project', string='Project')
