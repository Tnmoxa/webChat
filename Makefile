#!make
PYTHON_EXEC ?= python3.11
VENV ?= "./.venv"
SHELL := /bin/bash
NODE_VERSION ?= 20.11.1
NPM_VERSION ?= 10.5.0


default:
	@echo OK

update-venv:
	source $(VENV)/bin/activate && pip install -e ./chatAPI
	source $(VENV)/bin/activate && pip install -e .

venv:
	[ -d $(VENV) ] || $(PYTHON_EXEC) -m venv $(VENV)
	source $(VENV)/bin/activate && pip install -U pip wheel setuptools pip-tools nodeenv
	source $(VENV)/bin/activate && nodeenv -p -n $(NODE_VERSION)
	source $(VENV)/bin/activate && npm install -g npm@$(NPM_VERSION)
	source $(VENV)/bin/activate && npm install -g yarn
	[ -d ./chatAPI ] || (git submodule init && git submodule update)
	$(MAKE) update-venv