# -*- coding: utf-8 -*-
# Author: Ray

from odoo import models, api, fields

from odoo.addons.muk_dms.models import dms_base


class Lock(models.Model):
    _inherit = 'muk_dms.lock'


class DatabaseDataModel(models.Model):
    _inherit = 'muk_dms.data_database'


class Settings(dms_base.DMSModel):
    _inherit = 'muk_dms.settings'
