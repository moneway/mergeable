module.exports = {
  CONFIGURATION_FILE_PATH: '.github/mergeable.yml',
  ERROR_INVALID_YML: 'Invalid mergeable YML file format. Root mergeable node is missing.',
  DEFAULT_PR_PASS: [{
    do: 'checks',
    state: 'completed',
    status: 'success',
    payload: {
      title: 'Ready to be merged!',
      summary: `All the validators have returned 'pass', you can freely merge this pull-request!`,
      text: `{{#each validationSuites}}
#### {{{statusIcon status}}} Validator: {{toUpperCase name}}
{{#each validations }} - {{{statusIcon status}}} ***{{{ description }}}***
       {{/each}}
{{/each}}`
    }
  }],
  DEFAULT_PR_FAIL: [{
    do: 'checks',
    state: 'completed',
    status: 'failure',
    payload: {
      title: `Actions required before merging`,
      summary: `Mergeable detected some issues with your pull-request, and requires some actions to be taken before merging.`,
      text: `{{#each validationSuites}}
#### {{{statusIcon status}}} Validator: {{toUpperCase name}}
{{#each validations }} - {{{statusIcon status}}} ***{{{ description }}}***
       {{/each}}
{{/each}}`
    }
  }],
  DEFAULT_PR_ERROR: [{
    do: 'checks',
    state: 'completed',
    status: 'action_required',
    payload: {
      title: 'Mergeable failed to run some checks',
      summary: `Some or all of the validators have returned 'error' status, please check below for details and fix your configuration file.`,
      text: `{{#each validationSuites}}
#### {{{statusIcon status}}} Validator: {{toUpperCase name}}
{{#each validations }} - {{{statusIcon status}}} ***{{{ description }}}***
        Input : {{{details.input}}}
        Settings : {{{displaySettings details.settings}}}
        {{#if details.error}}
        Error : {{{details.error}}}
        {{/if}}
        {{/each}}
{{/each}}`
    }
  }],
  DEFAULT_ISSUES_PASS: [{
    do: 'comment',
    payload: {
      body: `All the validators have returned 'pass'! \n Here are some stats of the run: \n {{validationCount}} validations were ran`
    }
  }],
  DEFAULT_ISSUES_FAIL: [{
    do: 'comment',
    payload: {
      body: `### We found some failed validations in your Issue
{{#each validationSuites}}
{{#ifEquals status "fail"}}
#### {{{statusIcon status}}} Validator: {{toUpperCase name}}
{{#each validations }} * {{{statusIcon status}}} ***{{{ description }}}***
Input : {{{details.input}}}
Settings : {{{displaySettings details.settings}}}
{{/each}}
{{/ifEquals}}
{{/each}}`
    }
  }],
  DEFAULT_ISSUES_ERROR: [{
    do: 'comment',
    payload: {
      body: `### We found some error in your mergeable configuration
{{#each validationSuites}}
{{#ifEquals status "error"}}
#### {{{statusIcon status}}} Validator: {{toUpperCase name}}
{{#each validations }} * {{{statusIcon status}}} ***{{{ description }}}***
Input : {{{details.input}}}
Settings : {{{displaySettings details.settings}}}
{{#if details.error}}
Error : {{{details.error}}}
{{/if}}
{{/each}}
{{/ifEquals}}
{{/each}}
        `
    }
  }],
  DEFAULT_PR_VALIDATE: [{
    do: 'title',
    must_exclude: {
      regex: '(^| )[\\[\\<]?(WIP|wip|🚧|Work in progress)[\\]\\>]?( |$)',
      on_success: 'Pull-request is not marked as `Work in progress`',
      on_failure: 'Pull-request is marked as `Work in progress` and should not be merged'
    }
  }, {
    do: 'label',
    must_exclude: {
      regex: 'work in progress|wip|do not merge',
      on_success: 'Pull-request is not marked as `Work in progress`',
      on_failure: 'Pull-request is marked as `Work in progress` and should not be merged'
    }
  }]
}
