const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) void {
    zine.website(b, .{
        .title = "Charles Renwick's Blog",
        .host_url = "https://charlesrenwick.com",
        .layouts_dir_path = "layouts",
        .content_dir_path = "content",
        .assets_dir_path = "assets",
        .static_assets = &.{
            "CNAME",
            //     "favicon.ico",
            //     ".well-known/atproto-did",
        },
        .debug = true,
    });
}
