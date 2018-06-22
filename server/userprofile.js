Accounts.onCreateUser(function (options, user) {
  // make sure that the user has a profole object
  user.profile = user.profile || {}
  user.profile = user.profile.image || {}
  // initiate follow to keep track of who they follow
  user.profile.image = []
  return user
})
